import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Create reCAPTCHA Enterprise client with proper authentication
 */
function createRecaptchaClient() {
  const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

  if (credentials) {
    // Production: Use service account credentials from environment variable
    try {
      const credentialsObj = JSON.parse(credentials);
      return new RecaptchaEnterpriseServiceClient({
        credentials: credentialsObj,
      });
    } catch (error) {
      console.error("Failed to parse Google Cloud credentials JSON:", error);
      throw new Error("Invalid Google Cloud credentials format");
    }
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // Alternative: Use credentials file path (for local development)
    return new RecaptchaEnterpriseServiceClient({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });
  } else {
    // Development: Use Application Default Credentials
    return new RecaptchaEnterpriseServiceClient();
  }
}

/**
 * Create an assessment to analyze the risk of a UI action using reCAPTCHA Enterprise.
 */
async function createAssessment({
  projectID,
  recaptchaKey,
  token,
  recaptchaAction,
}: {
  projectID: string;
  recaptchaKey: string;
  token: string;
  recaptchaAction: string;
}): Promise<number | null> {
  try {
    // Create the reCAPTCHA client with proper authentication
    const client = createRecaptchaClient();
    const projectPath = client.projectPath(projectID);

    // Build the assessment request
    const request = {
      assessment: {
        event: {
          token,
          siteKey: recaptchaKey,
        },
      },
      parent: projectPath,
    };

    const [response] = await client.createAssessment(request);

    // Check if the token is valid
    if (!response.tokenProperties?.valid) {
      console.warn(
        `The CreateAssessment call failed because the token was: ${response.tokenProperties?.invalidReason}`
      );
      return null;
    }

    // Check if the expected action was executed
    if (response.tokenProperties.action === recaptchaAction) {
      // Get the risk score and the reason(s)
      const score = response.riskAnalysis?.score ?? 0;
      console.warn(`The reCAPTCHA score is: ${score}`);

      response.riskAnalysis?.reasons?.forEach((reason) => {
        console.warn(reason);
      });

      return score;
    } else {
      console.warn(
        "The action attribute in your reCAPTCHA tag does not match the action you are expecting to score"
      );
      return null;
    }
  } catch (error) {
    console.error("reCAPTCHA Enterprise assessment failed:", error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { token, action } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: "reCAPTCHA token is required" },
        { status: 400 }
      );
    }

    const projectID = process.env.GOOGLE_CLOUD_PROJECT_ID ?? "r3tain";
    const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!recaptchaKey) {
      console.error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not configured");
      return NextResponse.json(
        { error: "reCAPTCHA is not properly configured" },
        { status: 500 }
      );
    }

    // Create assessment using reCAPTCHA Enterprise
    const score = await createAssessment({
      projectID,
      recaptchaKey,
      token,
      recaptchaAction: action,
    });

    if (score === null) {
      return NextResponse.json(
        {
          error: "reCAPTCHA verification failed",
        },
        { status: 400 }
      );
    }

    // For reCAPTCHA Enterprise, check the score (0.0 to 1.0)
    // Higher scores indicate more human-like behavior
    const minScore = 0.5; // Adjust this threshold as needed

    if (score < minScore) {
      return NextResponse.json(
        {
          error: "reCAPTCHA score too low",
          score,
          minScore,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      score,
      action,
    });
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify reCAPTCHA" },
      { status: 500 }
    );
  }
}

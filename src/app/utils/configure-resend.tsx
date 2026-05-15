/**
 * Resend API Configuration Helper
 * 
 * This utility helps you verify your Resend API setup and provides
 * helpful instructions for configuration.
 */

export interface ResendConfig {
  isConfigured: boolean;
  message: string;
  instructions?: string[];
}

/**
 * Check if Resend API is configured
 * Note: This runs on the client side and can't access server environment variables
 * The actual check happens on the server when you try to send an OTP
 */
export function checkResendConfig(): ResendConfig {
  return {
    isConfigured: false, // Client can't know this
    message: "Resend configuration is managed on the server",
    instructions: [
      "1. Sign up at https://resend.com (free account)",
      "2. Get your API key from the Resend dashboard",
      "3. Add it to Supabase Edge Function secrets as 'RESEND_API_KEY'",
      "4. Test by using the forgot password feature",
    ]
  };
}

/**
 * Instructions for adding Resend API key to Supabase
 */
export const RESEND_SETUP_INSTRUCTIONS = {
  title: "Setting Up Resend for Email Delivery",
  
  steps: [
    {
      step: 1,
      title: "Create Resend Account",
      description: "Sign up for a free account at https://resend.com",
      details: [
        "No credit card required",
        "100 free emails per day",
        "Perfect for testing and small projects"
      ]
    },
    {
      step: 2,
      title: "Get API Key",
      description: "Generate an API key from the Resend dashboard",
      details: [
        "Go to 'API Keys' section",
        "Click 'Create API Key'",
        "Copy the key (starts with 're_')",
        "Keep it secure - never share it publicly"
      ]
    },
    {
      step: 3,
      title: "Add to Supabase",
      description: "Set the API key as a Supabase Edge Function secret",
      methods: [
        {
          name: "Via Supabase Dashboard",
          steps: [
            "Go to Project Settings → Edge Functions → Secrets",
            "Click 'Add new secret'",
            "Name: RESEND_API_KEY",
            "Value: Your Resend API key",
            "Click Save"
          ]
        },
        {
          name: "Via Supabase CLI",
          command: "supabase secrets set RESEND_API_KEY=re_your_api_key_here"
        }
      ]
    },
    {
      step: 4,
      title: "Test the Setup",
      description: "Verify emails are being sent",
      details: [
        "Go to /admin/forgot-password",
        "Enter an admin email address",
        "Check your email inbox",
        "If no email: check Resend logs and spam folder"
      ]
    }
  ],

  developmentMode: {
    title: "Development Mode (Without API Key)",
    description: "If RESEND_API_KEY is not set, the system will:",
    features: [
      "✓ Generate OTP codes normally",
      "✓ Display OTP on screen for testing",
      "✓ Log OTP to server console",
      "✓ Skip email sending",
      "✓ Still validate OTP and reset password"
    ],
    note: "This is perfect for development and testing!"
  },

  productionMode: {
    title: "Production Mode (With API Key)",
    description: "Once RESEND_API_KEY is set, the system will:",
    features: [
      "✓ Send professional HTML emails",
      "✓ Include branded templates",
      "✓ Hide OTP from screen (security)",
      "✓ Log email sending status",
      "✓ Handle email errors gracefully"
    ],
    note: "Add the API key when ready for production!"
  },

  emailTemplate: {
    from: "The Encounter-Place Worldwide <onboarding@resend.dev>",
    subject: "Password Reset - Your OTP Code",
    defaultDomain: "onboarding@resend.dev",
    customDomainNote: "You can add a custom domain in Resend dashboard for branded emails"
  },

  troubleshooting: [
    {
      issue: "Email not received",
      solutions: [
        "Check spam/junk folder",
        "Verify email address is correct",
        "Check Resend dashboard logs",
        "Ensure API key is set correctly",
        "Verify the email domain is configured"
      ]
    },
    {
      issue: "Still seeing 'Development Mode' after adding key",
      solutions: [
        "Restart Supabase Edge Functions",
        "Clear browser cache",
        "Wait 1-2 minutes for secrets to propagate",
        "Check Edge Function logs for errors"
      ]
    },
    {
      issue: "Invalid API key error",
      solutions: [
        "Verify the key starts with 're_'",
        "Check for extra spaces in the secret value",
        "Regenerate the key in Resend dashboard",
        "Ensure the key has necessary permissions"
      ]
    }
  ],

  resources: [
    {
      title: "Resend Documentation",
      url: "https://resend.com/docs"
    },
    {
      title: "Resend API Reference",
      url: "https://resend.com/docs/api-reference/introduction"
    },
    {
      title: "Supabase Edge Functions Secrets",
      url: "https://supabase.com/docs/guides/functions/secrets"
    }
  ]
};

/**
 * Generate a summary of the current email configuration
 */
export function getEmailConfigSummary() {
  return {
    backend: {
      location: "/supabase/functions/server/index.tsx",
      endpoint: "/make-server-a056ab6a/admin/forgot-password",
      features: [
        "6-digit OTP generation",
        "10-minute expiration",
        "Resend API integration",
        "HTML email templates",
        "Development mode fallback",
        "Secure validation"
      ]
    },
    frontend: {
      location: "/components/ForgotPassword.tsx",
      features: [
        "Multi-step form (email → OTP → new password)",
        "Real-time validation",
        "Development mode indicator",
        "Error handling",
        "Success confirmation",
        "Resend code option"
      ]
    },
    security: {
      measures: [
        "OTP expires after 10 minutes",
        "Single-use OTP codes",
        "Secure random generation",
        "Email validation",
        "Admin role verification",
        "Rate limiting ready"
      ]
    }
  };
}

/**
 * Helper to validate Resend API key format
 */
export function validateResendApiKey(apiKey: string): {
  valid: boolean;
  message: string;
} {
  if (!apiKey) {
    return {
      valid: false,
      message: "API key is required"
    };
  }

  if (!apiKey.startsWith('re_')) {
    return {
      valid: false,
      message: "Resend API keys should start with 're_'"
    };
  }

  if (apiKey.length < 20) {
    return {
      valid: false,
      message: "API key appears to be too short"
    };
  }

  return {
    valid: true,
    message: "API key format looks correct!"
  };
}

/**
 * Example Resend API usage (for reference)
 */
export const RESEND_EXAMPLE = {
  curl: `curl -X POST 'https://api.resend.com/emails' \\
  -H 'Authorization: Bearer re_your_api_key' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "from": "onboarding@resend.dev",
    "to": "user@example.com",
    "subject": "Test Email",
    "html": "<p>Hello World</p>"
  }'`,

  javascript: `const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${RESEND_API_KEY}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: 'onboarding@resend.dev',
    to: 'user@example.com',
    subject: 'Test Email',
    html: '<p>Hello World</p>',
  }),
});`,

  note: "This is already implemented in your server code!"
};

export default {
  checkResendConfig,
  RESEND_SETUP_INSTRUCTIONS,
  getEmailConfigSummary,
  validateResendApiKey,
  RESEND_EXAMPLE
};

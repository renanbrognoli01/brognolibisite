# Privacy data-flow register

Internal implementation inventory, checked against the website and BROGNOLI Studio repositories on 2026-09-28. It is not a legal opinion. Confirm provider account settings and contractual terms before treating the location column as a complete public disclosure.

| Provider/service | Data categories sent or stored | Purpose | Processing location status |
| --- | --- | --- | --- |
| Supabase Auth and Database | Email, name, provider account identifiers, profile, subscription/credit state, device fingerprint/name/OS/app version, and operational usage metadata | Authentication, account, licensing, billing state, and backend | Project region not present in source; confirm in the Supabase project settings. |
| Stripe | Account email/name, customer and subscription identifiers, price/currency, checkout and payment metadata | Checkout, subscription lifecycle, payment processing | Confirm the business/account configuration and Stripe data-processing terms. |
| Resend | Recipient email/name and trial/plan information included in reminder messages | Operational trial reminder email | Confirm account region and applicable data-processing terms. |
| Vercel hosting and Blob | Website request/diagnostic data; uploaded public materials, file names, and download traffic | Website hosting and public material downloads | Blob dashboard screenshot showed region `GRU1`; verify this is still the connected production store. Hosting/log region must be checked in the Vercel project. |
| OpenAI, Anthropic, Google Gemini | Prompts, model context, and files/attachments submitted to managed AI features; requests sent directly by Studio in BYOK mode | Generate user-requested AI output | Depends on selected provider/account and provider settings; verify provider retention, training, and regional-processing terms. |
| Google and Microsoft identity | Authentication identifiers and profile claims provided during social sign-in | OAuth authentication | Provider processing geography is not configured by this code; review current provider terms. |
| YouTube Data API / Google | Public channel/video identifiers and API requests | Display the configured public channel's latest videos | No user account data is intentionally sent by this integration; provider infrastructure location is not controlled here. |

## Follow-up before claiming a complete country-by-country disclosure

1. Confirm the Supabase project's actual region in its Dashboard.
2. Confirm the production Vercel hosting/log region and that the connected Blob store still uses `GRU1`.
3. Review the active Stripe and Resend account/data-processing settings.
4. Decide which managed AI providers are offered in production and check each provider's retention/training and data-residency settings.
5. Update the privacy policy with verified locations and transfer safeguards. Do not infer a country from a vendor's headquarters or from the region of a different product.

The website's privacy contact currently supports manual access/export/deletion requests. There is no self-service export or automated account-deletion workflow in these repositories; requests require identity verification and manual fulfillment, including review of billing records that may need to be retained.

'use client';

// This is the specific ID for your conversion action.
// It should be in the format: AW-YOUR_ACCOUNT_ID/YOUR_ACTION_ID
// If you have different conversion actions for different websites, you can change this value
// in the corresponding project.
const CONVERSION_ID = 'AW-17974591338/kIrgCKDatP4bEOr--fpC';

/**
 * Reports a conversion event to Google Ads.
 * This function should be called when a user performs a key action,
 * such as clicking a "Contact Us" or "Book Appointment" button.
 */
export const reportGtagConversion = () => {
  const gtag = (window as any).gtag;
  if (typeof gtag === 'function') {
    gtag('event', 'conversion', {
      'send_to': CONVERSION_ID,
      'transaction_id': '' // transaction_id is optional and used to deduplicate conversions
    });
  }
};

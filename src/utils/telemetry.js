// Commercial Game Telemetry & Event Analytics Logger
// Formatted for Google Analytics 4, Mixpanel, and GameAnalytics

class TelemetryManager {
  constructor() {
    this.sessionStartTime = Date.now();
    this.eventsLog = [];
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  logEvent(eventName, params = {}) {
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      sessionElapsedSeconds: Math.round((Date.now() - this.sessionStartTime) / 1000),
      ...params
    };

    this.eventsLog.push(payload);
    if (this.eventsLog.length > 50) {
      this.eventsLog.shift();
    }

    // Forward to window.dataLayer / gtag if available in commercial wrapper
    if (typeof window !== 'undefined') {
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push(payload);
      }
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
      }
    }

    // Informative debug logger in non-production
    if (!this.isProduction) {
      console.log(`[📊 Telemetry] ${eventName}`, params);
    }
  }

  trackTutorialStart() {
    this.logEvent('tutorial_started', { step: 1, flow: 'first_merge' });
  }

  trackTutorialComplete() {
    this.logEvent('tutorial_completed', { step: 1, flow: 'first_merge' });
  }

  trackMerge(itemLevel, category, comboCount) {
    this.logEvent('merge_performed', {
      item_level: itemLevel,
      category,
      combo_count: comboCount
    });
  }

  trackOrderServed(orderId, coinsEarned, isRushHour) {
    this.logEvent('order_served', {
      order_id: orderId,
      coins_earned: coinsEarned,
      is_rush_hour: Boolean(isRushHour)
    });
  }

  trackRewardedAd(placement, rewardType, rewardAmount) {
    this.logEvent('ad_reward_claimed', {
      ad_placement: placement,
      reward_type: rewardType,
      reward_amount: rewardAmount
    });
  }

  trackLevelUp(newLevel) {
    this.logEvent('level_up', { level: newLevel });
  }
}

export const telemetry = new TelemetryManager();

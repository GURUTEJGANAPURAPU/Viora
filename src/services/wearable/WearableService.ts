import { GoogleHealthProvider } from "./GoogleHealthProvider";
import type { WearableProvider } from "./WearableProvider";
import { WearableUnavailableError } from "./types";

/**
 * WearableService is the single façade the UI talks to. It hides which
 * concrete provider is active and normalises errors so the UI can render
 * empty / permission / error states without knowing about the transport.
 *
 * Register additional providers here as they are implemented (Apple Health,
 * Fitbit Web API, etc.). Provider selection stays in this file — UI code
 * never imports a provider directly.
 */
class WearableServiceImpl {
  private provider: WearableProvider = new GoogleHealthProvider();
  private initialized = false;

  getProvider(): WearableProvider {
    return this.provider;
  }

  setProvider(provider: WearableProvider) {
    this.provider = provider;
    this.initialized = false;
  }

  async ensureInitialized() {
    if (this.initialized) return;
    await this.provider.initialize();
    this.initialized = true;
  }

  async isAvailable() {
    await this.ensureInitialized();
    return this.provider.isAvailable();
  }

  async requestPermissions() {
    await this.ensureInitialized();
    return this.provider.requestPermissions();
  }

  async connect() {
    await this.ensureInitialized();
    return this.provider.connect();
  }

  async disconnect() {
    await this.ensureInitialized();
    return this.provider.disconnect();
  }

  async sync() {
    await this.ensureInitialized();
    return this.provider.sync();
  }

  async getConnectedDevice() {
    await this.ensureInitialized();
    return this.provider.getConnectedDevice();
  }

  async getHealthSummary() {
    await this.ensureInitialized();
    return this.provider.getHealthSummary();
  }

  async getHeartRate(rangeHours?: number) {
    await this.ensureInitialized();
    return this.provider.getHeartRate(rangeHours);
  }

  async getSteps(days?: number) {
    await this.ensureInitialized();
    return this.provider.getSteps(days);
  }

  async getSleep(days?: number) {
    await this.ensureInitialized();
    return this.provider.getSleep(days);
  }

  async getCalories(days?: number) {
    await this.ensureInitialized();
    return this.provider.getCalories(days);
  }

  async getWeight(days?: number) {
    await this.ensureInitialized();
    return this.provider.getWeight(days);
  }

  async getBloodPressure(days?: number) {
    await this.ensureInitialized();
    return this.provider.getBloodPressure(days);
  }

  async getSpo2(days?: number) {
    await this.ensureInitialized();
    return this.provider.getSpo2(days);
  }

  async getTimeline(limit?: number) {
    await this.ensureInitialized();
    return this.provider.getTimeline(limit);
  }

  async getInsights() {
    await this.ensureInitialized();
    return this.provider.getInsights();
  }
}

export const WearableService = new WearableServiceImpl();
export { WearableUnavailableError };

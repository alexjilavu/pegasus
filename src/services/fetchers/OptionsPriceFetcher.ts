import axios from 'axios';
import {injectable, inject} from "inversify";

import Settings from '../../types/Settings';

interface OptionsEntries {
  [key: string]: number;
}

interface OptionsPriceResponse {
  data: {
    [key: string]: {
      callPrice: number;
      iv: number;
      putPrice: number;
    }
  }
}

@injectable()
class OptionsPriceFetcher {
  private apiKey: string;
  private timeout: number;
  
  constructor(
    @inject('Settings') settings: Settings
  ) {
    this.apiKey = settings.api.optionsPrice.apiKey;
    this.timeout = settings.api.optionsPrice.timeout;
  }

  async apply(): Promise<OptionsEntries> {
    const sourceUrl = 'https://options-api.umb.network/options';

    const response = await axios.get(sourceUrl, {
      timeout: this.timeout,
      timeoutErrorMessage: `Timeout exceeded: ${sourceUrl}`,
      headers: {'Authorization': `Bearer ${this.apiKey}`}
    })

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    return this.parseOptionPrices(response.data)
  }

  private parseOptionPrices({ data: options }: OptionsPriceResponse) {
    const optionsEntries: OptionsEntries = {}

    for (const key in options) {
      optionsEntries[`${key}_call_price`] = options[key].callPrice
      optionsEntries[`${key}_iv`] = options[key].iv
      optionsEntries[`${key}_put_price`] = options[key].putPrice
    }
  
    return optionsEntries
  }
}

export default OptionsPriceFetcher;

import type { HelixEventSubSubscription } from '@twurple/api';
import { rtfm } from '@twurple/common';
import type { EventSubChannelSubscriptionMessageEventData } from '../events/EventSubChannelSubscriptionMessageEvent';
import { EventSubChannelSubscriptionMessageEvent } from '../events/EventSubChannelSubscriptionMessageEvent';
import type { EventSubBase } from '../EventSubBase';
import { EventSubSubscription } from './EventSubSubscription';

/**
 * @private
 */
@rtfm('eventsub', 'EventSubSubscription')
export class EventSubChannelSubscriptionMessageSubscription extends EventSubSubscription<EventSubChannelSubscriptionMessageEvent> {
	constructor(
		handler: (data: EventSubChannelSubscriptionMessageEvent) => void,
		client: EventSubBase,
		private readonly _userId: string
	) {
		super(handler, client);
	}

	get id(): string {
		return `channel.subscription.end.${this._userId}`;
	}

	protected transformData(
		data: EventSubChannelSubscriptionMessageEventData
	): EventSubChannelSubscriptionMessageEvent {
		return new EventSubChannelSubscriptionMessageEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return await this._client._apiClient.helix.eventSub.subscribeToChannelSubscriptionMessageEvents(
			this._userId,
			await this._getTransportOptions()
		);
	}
}

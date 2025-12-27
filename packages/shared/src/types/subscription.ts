import { BaseEntityProps } from "./base"
import { NewsletterEnum } from "./newsletter"

export interface SubscriptionProps extends BaseEntityProps {
	subscriberUuid: string
	newsletter: NewsletterEnum
}

export interface CreateSubscriptionsRequest {
	email: string
	newsletters: NewsletterEnum[]
}
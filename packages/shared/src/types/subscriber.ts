import { BaseEntityProps } from "./base"

export interface SubscriberProps extends BaseEntityProps {
	email: string
	isVerifiedAt?: Date
}
import { getResource } from 'helpers/resource';

export default class PaymentOption {
	constructor(data) {
		data = !data ? {} : data;

		this.id = data.id;
		this.createdAt = data.createdAt;
		this.deletedAt = data.deletedAt;
		this.discountDays = data.discountDays || 0;
		this.discountPercentage = data.discountPercentage || 0;
		this.dueDays = data.dueDays || 0;
		this.dueEditable = data.dueEditable || false;
		this.invoiceText = data.invoiceText || '';
		this.isBasic = data.isBasic || false;
		this.isDefault = data.isDefault || false;
		this.isInstant = data.isInstant || false;
		this.name = data.name || '';
		this.offerText = data.offerText || '';
		this.purchaseOrderText = data.purchaseOrderText || '';
		this.sortId = data.sortId || 0;
		this.tenantId = data.tenantId;
		this.updatedAt = data.updatedAt;
	}

	get displayDueDays() {
		const { dueDays } = this;

		if (dueDays === 0) {
			return getResource('str_immediately');
		} else {
			return dueDays > 1 ? `${dueDays} ${getResource('str_days')}` : `${dueDays} ${getResource('str_day')}`;
		}
	}
}

import React from 'react';
// import moment from 'moment';
import { formatDate, formatClientDate, formatApiDate } from 'helpers/formatDate';
import { getResource } from 'helpers/resource';
import SVGInline from 'react-svg-inline';
import ExportDownload from 'assets/images/svg/export_download.svg';
import ExportShare from 'assets/images/svg/export_share.svg';
export default class DocumentExportItem {
	constructor(data) {
		data = !data ? {} : data;

		this.id = data.id;
		this.content = data.content;
		this.exportType = data.type;
		this.createdAt = data.createdAt;
		this.documentUrl = data.documentUrl;
		this.endDate = data.endDate;
		this.exportPeriod = data.exportPeriod;
		this.sentAt = data.sentAt;
		this.startDate = data.startDate;
		this.status = data.status;
		this.wasJustAdded = false;
		this.exportFormat = data.exportFormat;
		this.pendingUpdatesTimeout = null;
		this.downloadButtonText = getResource('str_download');
		this.sendButtonText = getResource('str_send');
	}

	get displayCreatedAt() {
		return this.createdAt ? formatDate(this.createdAt) : '-';
	}
	get displayExportType() {
		return this.exportType ? this.exportType : '-';
	}
	get displayContent() {
		const CONTENT_TYPE = {
			invoice: getResource('str_outgoingInvoice'),
			expense: getResource('str_expenditure')
		};
		return this.content.map((item, idx) => <div key={idx}>{CONTENT_TYPE[item]}</div>);
	}

	get displayExportFormat() {
		return this.exportFormat === `gstr1` ? `GSTR-1`  : this.exportFormat === `gstr3b` ? `GSTR-3B`: `Invoices, Expenses`;
	}

	get displayPeriod() {
		if (this.exportPeriod) {
			return this.exportPeriod;
		}

		//return `${moment(this.startDate).format('DD-MM-YYYY')} - ${moment(this.endDate).format('DD.MM.YYYY')}`;
		return `${formatClientDate(this.startDate)} - ${formatClientDate(this.endDate)}`;
	}

	get displayActions() {
		return this.status === 'success' ? (
			<div className="actions">
				<div style={this.sentAt ? {display: 'flex', flexDirection: 'column'} : {}}>
					<SVGInline width="16px" svg={ExportDownload} />
					<a data-action="download">{getResource('str_download')}</a>
				</div>
				<div style={this.sentAt ? {display: 'flex', flexDirection: 'column'} : {}}>
					<SVGInline width="16px" svg={ExportShare} />
					<a data-action="send">{this.sentAt ? `Share again`: `Share`}</a>
				</div>
			</div>
		) : this.status === 'error' ? (
			<div className="status-failed">{getResource('str_failed')}</div>
		) : (
			<div>{getResource('str_willBeCreated')}</div>
		);
	}
}

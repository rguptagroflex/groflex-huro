import _ from "lodash";
import lang from "../lang";
import WebStorageService from "./services/webstorage.service";
import WebStorageKey from "./enums/web-storage-key.enum";

const apiServers = {
	// local: "http://localhost:3000",
	local: "https://dev.groflex.io",
	development: "https://dev.groflex.io",
	qa: "https://qa.groflex.io",
	staging: "https://staging.groflex.io",
	production: "https://app.groflex.io",
	integration: "https://web-integration-invoiz.buhl.de",
	admin: "https://invoiz-admin.buhl.de",
};

const releaseStage = _.get(window, "settings.releaseStage") || "development";
delete window.settings;

let apiRoot = WebStorageService.getItem(WebStorageKey.API_ROOT) || apiServers[releaseStage];

if (!apiRoot) {
	apiRoot = "https://app.groflex.io";
}

const path = window.location.pathname;
const queryString = window.location.search;

if (path && path.indexOf("/account/") === -1 && path.indexOf("/amazon/") === -1) {
	WebStorageService.setItem(WebStorageKey.RETURN_AFTER_LOGIN, path + queryString);
} else if (queryString.length > 0 && path.indexOf("/account/") === -1 && path.indexOf("/amazon/") === -1) {
	WebStorageService.setItem(WebStorageKey.RETURN_AFTER_LOGIN, queryString);
}

const setResourceHost = () => {
	return `${apiRoot}/api/`;
};

const setAssetResourceHost = () => {
	return `${apiRoot}/api`;
};

const resourceHost = setResourceHost();
const imageResourceHost = setAssetResourceHost();
const assetResourceHost = setAssetResourceHost();

const resourceUrls = {
	closingInvoice: `${resourceHost}closingInvoice`,
	depositInvoice: `${resourceHost}depositInvoice`,
	invoice: `${resourceHost}invoice`,
	offer: `${resourceHost}offer`,
	purchaseOrder: `${resourceHost}purchaseOrder`,
	settings: `${resourceHost}setting/`,
	user: `${resourceHost}user`,
	razorpay: `${resourceHost}razorpay`,
	apps: `${resourceHost}apps/`,
	appsPerUser: `${resourceHost}appsPerUser/`,
	deliveryChallan: `${resourceHost}deliveryChallan`,
};

// move into helper file
// export const getLabelForCountry = iso2 => {
// 	const countries = config.countries.filter(obj => obj.iso2 === iso2);
// 	return countries.length > 0 ? countries[0] : '';
// };

const config = {
	apiRoot,
	releaseStage,

	resourceHost,
	imageResourceHost,
	assetResourceHost,
	resourceUrls,

	getAllCustomers: `${resourceHost}find/customer/*`,
	getAllArticles: `${resourceHost}find/article/*`,
	getAllEanRecords: `${resourceHost}find/eanRecord/`, // append searchString

	menuItemsData: [
		{ name: "start", icon: "home_blank", title: "Start", url: "/", resourceKey: "start" },
		{ name: "dashboard", icon: "dashboard", title: "Dashboard", url: "/dashboard", resourceKey: "dashboard" },
		//	{
		// name: 'offers',
		// icon: 'offer',
		// title: 'Angebote',
		// url: '/offers',
		// resourceKey: 'offer'
		// ,
		// submenuItems: [
		// 	{
		// 		name: 'offer',
		// 		title: 'Angebote',
		// 		url: '/offers',
		// 		mainSubmenuItem: 'offers',
		// 		resourceKey: 'offer'
		// 	},
		// 	{
		// 		name: 'offerImpress',
		// 		title: 'IMPRESS-Angebote',
		// 		url: '/offers/impress',
		// 		mainSubmenuItem: 'offers',
		// 		resourceKey: 'impressOffer'
		// 	},
		// 	{
		// 		name: 'offerImpressTemplates',
		// 		title: 'IMPRESS-Vorlagen',
		// 		url: '/offer/impress/templates',
		// 		mainSubmenuItem: 'offers',
		// 		resourceKey: 'impressTemplate'
		// 	}
		// ]
		//},
		{
			name: "invoices",
			icon: "sales",
			title: "Rechnungen",
			url: "",
			resourceKey: "invoice",
			submenuItems: [
				{
					name: "invoice",
					title: "Rechnungen",
					url: "/invoices",
					mainSubmenuItem: "invoices",
					resourceKey: "invoice",
				},
				{
					name: "offer",
					// icon: 'offer',
					title: "Angebote",
					url: "/offers",
					mainSubmenuItem: "invoices",
					resourceKey: "offer",
				},
				// {
				// 	name: "deliverychallan",
				// 	title: "Lieferung-Challan",
				// 	url: "/deliverychallans",
				// 	mainSubmenuItem: "invoices",
				// 	resourceKey: "challan",
				// },
				{
					name: "recurringInvoice",
					title: "Abo-Rechnungen",
					url: "/invoices/recurringInvoice",
					mainSubmenuItem: "invoices",
					resourceKey: "subscriptionBill",
				},
				// {
				// 	name: 'project',
				// 	title: 'Abschläge',
				// 	url: '/invoices/project',
				// 	mainSubmenuItem: 'invoices',
				// 	resourceKey: 'discount'
				// },
				{
					name: "timetracking",
					title: "Zeiterfassungen",
					url: "/invoices/timetracking",
					mainSubmenuItem: "invoices",
					resourceKey: "timesheet",
				},
				// {
				// 	name: "creditNotes",
				// 	title: "Zeiterfassungen",
				// 	url: "/cancellations",
				// 	mainSubmenuItem: "invoices",
				// 	resourceKey: "creditNotes",
				// },
			],
		},
		// {
		// 	name: 'banking',
		// 	icon: 'banking',
		// 	title: 'Banking',
		// 	url: '',
		// 	resourceKey: 'banking',
		// 	submenuItems: [
		// 		{
		// 			name: 'bankingFinanceCockpit',
		// 			title: 'Finanzcockpit',
		// 			url: '/banking/financecockpit',
		// 			mainSubmenuItem: 'banking',
		// 			resourceKey: 'financialCockpit'
		// 		},
		// 		{
		// 			name: 'bankingTransactions',
		// 			title: 'Transaktionen',
		// 			url: '/banking/transactions',
		// 			mainSubmenuItem: 'banking',
		// 			resourceKey: 'transactionKey'
		// 		}
		// 	]
		// },
		{ name: "customers", icon: "customer", title: "Kunden", url: "/customers", resourceKey: "contacts" },
		{ name: "articles", icon: "article_outlined", title: "Artikel", url: "/articles", resourceKey: "article" },
		// {
		// 	name: "articles",
		// 	icon: "article",
		// 	title: "Artikel",
		// 	url: "",
		// 	resourceKey: "article",
		// 	submenuItems: [
		// 		// {
		// 		// 	name: 'articles',
		// 		// 	title: 'Rechnungen',
		// 		// 	url: '/articles',
		// 		// 	mainSubmenuItem: 'Article detail',
		// 		// 	resourceKey: 'article'
		// 		// },
		// 		// {
		// 		// 	name: 'inventory',
		// 		// 	title: 'Abo-Rechnungen',
		// 		// 	url: '/inventory',
		// 		// 	mainSubmenuItem: 'Stock Movement',
		// 		// 	resourceKey: 'inventory'
		// 		// },
		// 		{
		// 			name: "articles",
		// 			title: "Rechnungen",
		// 			url: "/articles",
		// 			mainSubmenuItem: "articles",
		// 			resourceKey: "article",
		// 		},
		// 		{
		// 			name: "inventory",
		// 			title: "Abo-Rechnungen",
		// 			url: "/inventory",
		// 			mainSubmenuItem: "articles",
		// 			resourceKey: "inventory",
		// 		},
		// 	],
		// },
		// {
		// 	name: "expenditure",
		// 	icon: "expense",
		// 	title: "Ausgaben",
		// 	url: "",
		// 	resourceKey: "expenditure",
		// 	submenuItems: [
		// 		{
		// 			name: "expenditures",
		// 			icon: "expense",
		// 			title: "Ausgaben",
		// 			url: "/expenses",
		// 			mainSubmenuItem: "expenditure",
		// 			resourceKey: "expenditures",
		// 		},
		// 		{
		// 			name: "purchaseOrders",
		// 			icon: "order",
		// 			title: "Purchase Orders",
		// 			url: "/purchase-orders",
		// 			mainSubmenuItem: "expenditure",
		// 			resourceKey: "purchaseOrder",
		// 		},
		// 		{
		// 			name: "debitNotes",
		// 			icon: "order",
		// 			title: "Debit notes",
		// 			url: "/expenses/cancellations",
		// 			mainSubmenuItem: "expenditure",
		// 			resourceKey: "debitNotes",
		// 		},
		// 	],
		// },
		// { name: 'expenses', icon: 'expense', title: 'Ausgaben', url: '/expenses', resourceKey: 'expense' },
		// { name: 'purchaseOrders', icon: 'order', title: 'Purchase Orders', url: '/purchase-orders', resourceKey: 'purchaseOrder' },
		// {
		// 	name: "documentExport",
		// 	icon: "tax",
		// 	title: "GST Export",
		// 	url: "/document-export",
		// 	resourceKey: "accountantExport",
		// },
		// {
		// 	name: "teamMembers",
		// 	icon: "user_user",
		// 	title: "Team Members",
		// 	url: "/settings/user",
		// 	resourceKey: "teamMembers",
		// },

		// {
		// 	name: "settings",
		// 	icon: "settings",
		// 	title: "Einstellungen",
		// 	url: "",
		// 	hasImprintAndPrivacy: true,
		// 	resourceKey: "settings",
		// 	submenuItems: [
		// 		{
		// 			name: "account",
		// 			title: "Account",
		// 			url: "/settings/account",
		// 			mainSubmenuItem: "settings",
		// 			resourceKey: "account",
		// 		},
		// 		// {
		// 		// 	name: 'user',
		// 		// 	title: 'Users',
		// 		// 	url: '/settings/user',
		// 		// 	mainSubmenuItem: 'settings',
		// 		// 	resourceKey: 'user'
		// 		// },
		// 		// {
		// 		// 	name: 'documentExport',
		// 		// 	title: 'Steuerberater Export',
		// 		// 	url: '/settings/document-export',
		// 		// 	mainSubmenuItem: 'settings',
		// 		// 	resourceKey: 'accountantExport'
		// 		// },
		// 		{
		// 			name: "dataImport",
		// 			title: "Import",
		// 			url: "/settings/data-import",
		// 			mainSubmenuItem: "settings",
		// 			resourceKey: "import",
		// 		},
		// 		{
		// 			name: "paymentConditions",
		// 			title: "Zahlungsbedingungen",
		// 			url: "/settings/payment-conditions",
		// 			mainSubmenuItem: "settings",
		// 			resourceKey: "termsOfPayment",
		// 		},

		// 		{
		// 			name: "textModules",
		// 			title: "Textbausteine",
		// 			url: "/settings/text-modules",
		// 			mainSubmenuItem: "settings",
		// 			resourceKey: "textModule",
		// 		},
		// 		{
		// 			name: "dunning",
		// 			title: "Mahnwesen",
		// 			url: "/settings/dunning",
		// 			mainSubmenuItem: "settings",
		// 			resourceKey: "dunning",
		// 		},
		// 		{
		// 			name: "moreSettings",
		// 			title: "Weitere Einstellungen",
		// 			url: "/settings/more-settings",
		// 			mainSubmenuItem: "settings",
		// 			resourceKey: "moreSettings",
		// 		},
		// 	],
		// },
		// {
		// 	name: "marketplace",
		// 	icon: "marketplace",
		// 	title: "Marketplace",
		// 	url: "/marketplace",
		// 	resourceKey: "marketplace",
		// },
	],

	apps: {
		endpoints: {
			getApps: `${resourceUrls.apps}`,
			getAppsPerUser: `${resourceUrls.appsPerUser}`,
		},
	},

	razorpay: {
		endpoints: {
			createAccount: `${resourceUrls.razorpay}/merchant/createaccount`,
			createStakeholder: `${resourceUrls.razorpay}/merchant/createstakeholder`,
			createBankDetails: `${resourceUrls.razorpay}/merchant/createconfig`,
			uploadMerchantDocuments: `${resourceUrls.razorpay}/merchant/uploadocuments`,
			uploadStakeholderDocuments: `${resourceUrls.razorpay}/merchant/uploadstakeholderdocuments`,
			getAccount: `${resourceUrls.razorpay}/merchant/getaccount`,
			getStakeholder: `${resourceUrls.razorpay}/merchant/getstakeholder`,
			getBank: `${resourceUrls.razorpay}/merchant/getbank`,
			getMerchantDocuments: `${resourceUrls.razorpay}/merchant/getdocuments`,
			getStakeholderDocuments: `${resourceUrls.razorpay}/merchant/getstakeholderdocuments`,
			updateAccount: `${resourceUrls.razorpay}/merchant/updateaccount`,
			updateStakeholder: `${resourceUrls.razorpay}/merchant/updatestakeholder`,
			updateBankDetails: `${resourceUrls.razorpay}/merchant/updateconfig`,
			completeKycStatus: `${resourceUrls.razorpay}/merchant/completekyc`,
			getAccountDetails: `${resourceUrls.razorpay}/merchant/getconfig`,
		},
		fineUploader: {
			messages: {
				// minSizeError: lang.expenseFileMinSizeError,
				// sizeError: lang.expenseFileMaxSizeError,
				typeError: `Please upload only images!`,
			},
			validation: {
				acceptFiles: ["image/jpg", "image/jpeg", "image/png", "application/pdf"],
				allowedExtensions: ["jpg", "jpeg", "png", "pdf"],
				sizeLimit: 25 * 1024 * 1024, // 25 mb
			},
			scaling: {
				sendOriginal: false,
				sizes: [{ name: "", maxSize: 4000 }],
			},
		},
	},

	account: {
		endpoints: {
			forgotPassword: `${resourceUrls.user}/forgotPassword`,
			prepareDelete: `${resourceUrls.user}/requestAccountDeletion`,
			changePassword: `${resourceUrls.user}/changePassword`,
			changeEmail: `${resourceUrls.user}/requestEmailChange`,
			resetPassword: `${resourceUrls.user}/resetPassword`,
			confirmEmailChange: `${resourceUrls.user}/confirmEmailChange`,
			getSubscription: `${resourceHost}subscription/state`,
			getSubscriptionHostedPageSession: `${resourceHost}chargebee/hosted/page`,
			// getSubscriptionHostedPageSession: `${resourceHost}zoho/hosted/page`,
			getSubscriptionPortalSession: `${resourceHost}chargebee/portal`,
			// getSubscriptionPortalSession: `${resourceHost}zoho/portal`,
			login: `${resourceHost}session/create?type=bearer`,
			registerEmail: `${resourceHost}user/email`,
			validateCode: `${resourceHost}user/email/code`,
			setPassword: `${resourceHost}user/password`,
			setTanantState: `${resourceHost}tenant/set_india_state`,
			setTanantMobileNo: `${resourceHost}tenant/set_mobile`,
			setLegalForm: `${resourceHost}tenant/small_business`,
			updateBusinessDetails: `${resourceHost}tenant/set_business_details`,
			resendCode: `${resourceHost}user/email/resend_code`,
			funFacts: `${resourceHost}funfacts`,
			deleteAccount: `${resourceHost}user`,
			getTenantInfo: `${resourceHost}tenant`,
			checkInvitationCode: `${resourceUrls.user}/invitation`,
			registerUser: `${resourceUrls.user}/register`,
			getUserPermissions: `${resourceUrls.user}/rights`,
			getPlanPermissions: `${resourceUrls.user}/planRights`,
			checkUser: `${resourceUrls.user}/checkUser`,
			setBusinessType: `${resourceHost}tenant/set_business_type`,
			setBusinessTurnoverType: `${resourceHost}tenant/set_business_turnover_type`,
			setBusinessCategoryType: `${resourceHost}tenant/set_business_category_type`,
			validateMobileOtp: `${resourceHost}tenant/verify_mobile_otp`,
			resendMobileOtp: `${resourceHost}tenant/send_mobile_otp`,

			// Razorpay checkout page
			getRazorpayCheckoutPage: `${resourceHost}razorpay/checkoutpage`,
			setBusinessInfo: `${resourceHost}tenant/set_business_info`,
			verifyRazorpayTransaction: `${resourceHost}razorpay/verifypayment`,
		},
	},

	article: {
		resourceUrl: `${resourceHost}article`,

		endpoints: {
			salesVolumeUrl: "article/getsalesvolumefromarticle",
			resourceUrl: `${resourceHost}article`,
			articlecategoryUrl: `${resourceHost}articlecategory`,
			articleunitUrl: `${resourceHost}articleunit`,
			nextArticleNumber: `${resourceHost}article/number`,
			articleImageUrl: `${resourceHost}article/image`,
		},

		image: {
			minWidthMessage: "Das Bild muss mindestens 1 Pixel breit sein.",
			minHeightMessage: "Das Bild muss mindestens 1 Pixel hoch sein.",
			maxWidthMessage: "Das Bild darf maximal 1300 Pixel breit sein.",
			maxHeightMessage: "Das Bild darf maximal 1300 Pixel hoch sein.",
		},

		clientUrl: {
			single: "article",
			multiple: "articles",
		},

		routes: {
			details: `/article/`,
			list: `/articles`,
		},

		fineUploader: {
			messages: {
				// minSizeError: lang.expenseFileMinSizeError,
				// sizeError: lang.expenseFileMaxSizeError,
				typeError: `Please upload only images!`,
			},
			validation: {
				acceptFiles: ["image/jpg", "image/jpeg", "image/png"],
				allowedExtensions: ["jpg", "jpeg", "png"],
				sizeLimit: 25 * 1024 * 1024, // 25 mb
			},
			scaling: {
				sendOriginal: false,
				sizes: [{ name: "", maxSize: 3000 }],
			},
		},
	},
	eanRecords: {
		resourceUrl: `${resourceHost}eanRecord`,

		endpoints: {
			createEanRecord: `${resourceHost}eanRecord`,
			getEanRecord: `${resourceHost}eanRecord`,
			getEanRecordsList: `${resourceHost}eanRecord`,
			updateEanRecord: `${resourceHost}eanRecord`,
			deleteEanRecord: `${resourceHost}eanRecord`,
			getEanRecordByNameOrEanNo: `${resourceHost}eanRecord/nameOrEan`,
			uploadEanImage: `${resourceHost}eanRecord/image`,
			getEanImage: `${resourceHost}`,
		},

		image: {
			minWidthMessage: "Das Bild muss mindestens 1 Pixel breit sein.",
			minHeightMessage: "Das Bild muss mindestens 1 Pixel hoch sein.",
			maxWidthMessage: "Das Bild darf maximal 1300 Pixel breit sein.",
			maxHeightMessage: "Das Bild darf maximal 1300 Pixel hoch sein.",
		},

		clientUrl: {
			single: "eanRecord",
			multiple: "eanRecors",
		},

		routes: {
			details: `/eanRecord/`,
			list: `/eanRecords`,
		},

		fineUploader: {
			messages: {
				// minSizeError: lang.expenseFileMinSizeError,
				// sizeError: lang.expenseFileMaxSizeError,
				typeError: `Please upload only images!`,
			},
			validation: {
				acceptFiles: ["image/jpg", "image/jpeg", "image/png"],
				allowedExtensions: ["jpg", "jpeg", "png"],
				sizeLimit: 25 * 1024 * 1024, // 25 mb
			},
			scaling: {
				sendOriginal: false,
				sizes: [{ name: "", maxSize: 3000 }],
			},
		},
	},

	inventory: {
		resourceUrl: `${resourceHost}inventory`,

		endpoints: {
			resourceUrl: `${resourceHost}inventory`,
		},

		clientUrl: {
			single: "inventory",
		},

		routes: {
			list: `/inventory`,
		},
	},

	customer: {
		resourceUrl: `${resourceHost}customer`,

		endpoints: {
			nextCustomerNumber: `${resourceHost}customer/number`,
			fetchDefaultCustomerModelUrl: `${resourceHost}customer/new`,
		},

		customerHistoryQuickfilters: [
			{ name: "all", title: "Alle" },
			{ name: "invoice", title: "Rechnungen" },
			{ name: "offer", title: "Angebote" },
		],

		clientUrl: {
			single: "customer",
			multiple: "customers",
		},

		routes: {
			details: `/customer/`,
			list: `/customers`,
		},
	},

	closingInvoice: {
		resourceUrl: resourceUrls.closingInvoice,
		clientUrl: {
			single: "closingInvoice",
			multiple: "closingInvoices",
		},
		endpoints: {
			createNewUrl: `${resourceUrls.closingInvoice}/new`,
		},
	},

	dashboard: {
		endpoints: {
			findCity: `${resourceHost}find/city/`,
			stats: `${resourceHost}dashboard/stats/`,
			statistic: `${resourceHost}statistic/`,
			estimationStats: `${resourceHost}statistic/`,
		},
	},

	depositInvoice: {
		resourceUrl: resourceUrls.depositInvoice,
		clientUrl: {
			single: "depositInvoice",
			multiple: "depositInvoices",
		},
		endpoints: {
			createNewDepositInvoice: `${resourceUrls.depositInvoice}/new`,
		},
	},

	dunning: {
		resourceUrl: `${resourceHost}dunning`,
	},

	expense: {
		resourceUrl: `${resourceHost}expense`,

		clientUrl: {
			single: "expense",
			multiple: "expenses",
		},

		endpoints: {
			uploadUrl: `${resourceHost}deltraservicesimage/uploadexpensefile`,
			deleteExpenseFileUrl: `${resourceHost}cachedata`,
			receiptUrl: `${resourceHost}expense/receipt`,
			getNewExpense: `${resourceHost}expense/new`,
			cancellationUrl: `${resourceHost}expenseCancellation`,
		},

		routes: {
			details: `/expense/`,
			list: `/expenses`,
		},

		fineUploader: {
			messages: {
				minSizeError: lang.expenseFileMinSizeError,
				sizeError: lang.expenseFileMaxSizeError,
				typeError: lang.expenseFileTypeError,
			},
			validation: {
				acceptFiles: ["image/jpg", "image/jpeg", "image/png", "application/pdf"],
				allowedExtensions: ["jpg", "jpeg", "pdf", "png"],
				sizeLimit: 25 * 1024 * 1024, // 25 mb
			},
			scaling: {
				sendOriginal: false,
				sizes: [{ name: "", maxSize: 3000 }],
			},
		},
	},

	invoice: {
		resourceUrl: resourceUrls.invoice,

		clientUrl: {
			single: "invoice",
			multiple: "invoices",
		},

		endpoints: {
			invoiceThumbsUrl: "reportfinance/getinvoicethumbs",
			invoiceSettingDetails: `${resourceHost}/setting/invoice`,
			getNextInvoiceNumber: `${resourceUrls.invoice}/number`,
			getNextReceiptNumber: `${resourceUrls.invoice}/number/receiptNumber`,
			validateInvoice: `${resourceUrls.invoice}/validate`,
			getNewInvoice: `${resourceUrls.invoice}/new`,
			getInvoiceFactorySetting: `${resourceUrls.invoice}/factorySetting`,
			cancellationUrl: `${resourceHost}cancellation`,
			getNextReceiptNumber: `${resourceUrls.invoice}/number/receiptNumber`,
		},

		routes: {
			details: `/invoice/`,
			list: `/invoices`,
		},
	},

	//*delivery challan
	deliveryChallan: {
		resourceUrl: resourceUrls.deliveryChallan,

		clientUrl: {
			single: "challan",
			multiple: "challans",
		},

		endpoints: {
			getChallan: `${resourceUrls.deliveryChallan}`,
			getNextChallanNumber: `${resourceUrls.deliveryChallan}/number`,
			// getOfferFactorySetting: `${resourceUrls.deliveryChallan}/factorySetting`,
			getNewChallan: `${resourceUrls.deliveryChallan}/new`,
		},

		routes: {
			details: `/deliverychallan/`,
			list: `/deliverychallans`,
		},
	},

	letter: {
		endpoints: {
			saveLetterPaperUrl: `${resourceHost}setting/letterPaper`,
			saveLetterPaperImageUrl: `${resourceHost}setting/letterPaper/image`,
		},

		fineUploader: {
			messages: {
				minWidthImageError: lang.logoUploadMinWidthError,
				maxWidthImageError: lang.logoUploadMaxWidthError,
				minHeightImageError: lang.logoUploadMinHeightError,
				maxHeightImageError: lang.logoUploadMaxHeightError,
				minSizeError: lang.logoUploadMinSizeError,
				sizeError: lang.logoUploadMaxSizeError,
				typeError: lang.logoUploadFileTypeError,
			},
			validation: {
				acceptFiles: ["image/jpg", "image/jpeg", "image/png"],
				allowedExtensions: ["jpg", "jpeg", "png"],
				sizeLimit: 10 * 1024 * 1024, // 10 mb
			},
			scaling: {
				sendOriginal: false,
				sizes: [{ name: "default", maxSize: 2250 }],
			},
		},

		fabricOptions: {
			cornerColor: "#5a9ff5",
			hasRotatingPoint: false,
			lockScalingFlip: true,
			lockUniScaling: true,
			minScaleLimit: 0.25,
			padding: 10,
			strokeWidth: 0,
			transparentCorners: false,
		},

		fabricShapeOptions: {
			cornerColor: "#5a9ff5",
			hasRotatingPoint: false,
			lockScalingFlip: true,
			padding: 10,
			strokeWidth: 0,
			transparentCorners: false,
		},

		fonts: [
			{
				name: "Segoe UI",
				default: true,
				selected: true,
				regular: 400,
				bold: 700,
				italic: true,
			},
			{
				name: "Source Sans Pro",
				regular: 400,
				bold: 700,
				italic: true,
			},
			{ name: "Caveat", regular: 400, bold: 700, italic: false },
			{ name: "Dancing Script", regular: 400, bold: 700, italic: false },
			{ name: "Economica", regular: 400, bold: 700, italic: false },
			{ name: "Gruppo", regular: 400, bold: false, italic: false },
			{ name: "Kalam", regular: 400, bold: 700, italic: false },
			{ name: "Merriweather Sans", regular: 400, bold: 700, italic: false },
			{ name: "Open Sans Condensed", regular: 300, bold: 700, italic: false },
			{ name: "PT Sans Narrow", regular: 400, bold: 700, italic: false },
			{ name: "Shadows Into Light", regular: 400, bold: false, italic: false },
			{ name: "Source Serif Pro", regular: 400, bold: 700, italic: true },
			{ name: "Tulpen One", regular: 400, bold: false, italic: false },
			{ name: "Voltaire", regular: 400, bold: false, italic: false },
		],
	},

	offer: {
		resourceUrl: resourceUrls.offer,

		endpoints: {
			getNextOfferNumber: `${resourceUrls.offer}/number`,
			getOfferFactorySetting: `${resourceUrls.offer}/factorySetting`,
			getNewOffer: `${resourceUrls.offer}/new`,
		},

		clientUrl: {
			single: "offer",
			multiple: "offers",
		},

		routes: {
			details: `/offer/`,
			list: `/offers`,
		},
	},

	purchaseOrder: {
		resourceUrl: resourceUrls.purchaseOrder,

		endpoints: {
			getNextPurchaseOrderNumber: `${resourceUrls.purchaseOrder}/number`,
			getPurchaseOrderFactorySetting: `${resourceUrls.purchaseOrder}/factorySetting`,
			getNewPurchaseOrder: `${resourceUrls.purchaseOrder}/new`,
		},

		clientUrl: {
			single: "purchaseOrder",
			multiple: "purchaseOrders",
		},

		routes: {
			details: `/purchaseOrder/`,
			list: `/purchaseOrders`,
		},
	},

	project: {
		resourceUrl: `${resourceHost}project`,
		createNewClosingInvoiceUrl: `${resourceHost}closingInvoice/new`,

		clientUrl: {
			single: "project",
			multiple: "projects",
		},
	},

	recurringInvoice: {
		resourceUrl: `${resourceHost}recurringInvoice`,

		clientUrl: {
			single: "recurringinvoice",
			multiple: "recurringinvoices",
		},
	},

	redirect: {
		resourceUrl: `${resourceHost}redirect`,
	},

	settings: {
		clientUrl: {
			multiple: "settings/document-export",
		},

		constants: {
			NUMERATION_NO_DATE: "none",
			NUMERATION_YEARLY: "YYYY",
			NUMERATION_MONTHLY: "YYYYMM",
			NUMERATION_DAILY: "YYYYMMDD",
		},

		dateFormats: {
			year: "YYYY",
			yearMonth: "YYYYMM",
			yearMonthDay: "YYYYMMDD",
		},

		endpoints: {
			infoSettings: `${resourceHost}InfoSetting`,

			// offer and invoice settings
			offerSettings: `${resourceUrls.settings}offer`,
			invoiceSettings: `${resourceUrls.settings}invoice`,
			depositInvoiceSettings: `${resourceUrls.settings}depositInvoice`,

			// tenant informations endpoint
			getTenantInfo: `${resourceHost}tenant`,

			// get subscription details endpoint
			getSubscriptionDetails: `${resourceHost}subscription/detail`,
			updateSubscription: `${resourceHost}chargebee/subscription`,
			// updateSubscription: `${resourceHost}zoho/subscription`,

			// account endpoint
			account: `${resourceUrls.settings}account`,
			notification: `${resourceUrls.settings}notification`,

			// condition endpoints
			payConditions: `${resourceUrls.settings}payCondition`,

			// tag endpoints
			miscellaneousData: `${resourceUrls.settings}miscellaneous`,

			contact: `${resourceUrls.settings}contact`,
			article: `${resourceUrls.settings}article`,
			customer: `${resourceUrls.settings}customer`,
			getCustomerCategory: `${resourceHost}customer/findByCategory`,
			replaceCustomerCategory: `${resourceHost}customer/renameCategory`,
			getArticleUnits: `${resourceHost}article/findByUnit`,
			replaceArtilceUnit: `${resourceHost}article/renameUnit`,
			getArticleCategory: `${resourceHost}article/findByCategory`,
			replaceArticleCategory: `${resourceHost}/article/renameCategory`,

			// text module endpoints
			textModule: `${resourceUrls.settings}textModule`,

			// dunning endpoints
			dunningLevel: `${resourceUrls.settings}dunningLevel`,

			getEmailsOfDocumentExports: "cachedata/getemailsofaccountantexports",

			getNumerationSettings: `${resourceHost}setting/numeration`,
			updateInvoiceNumeration: `${resourceHost}setting/invoice/changeNumeration`,
			updateOfferNumeration: `${resourceHost}setting/offer/changeNumeration`,
			updatePurchaseOrderNumeration: `${resourceHost}setting/purchaseOrder/changeNumeration`,
			updateReceiptNumeration: `${resourceHost}setting/pos_receipt/changeNumeration`,
			getNumerationSettingDate: `${resourceHost}setting/numeration/`,
			accountantExportUrl: `${resourceHost}accountantExport/`,

			// user
			getUserData: `${resourceHost}setting/user`,
			getUserList: `${resourceHost}user/list`,
			completeUserData: `${resourceHost}user/completeUserData`,

			// Currency rates
			getLatestRate: `${resourceHost}fixer/exrate?type=latest`,
			convertRate: `${resourceHost}fixer/exrate?type=convert`,
		},
	},

	timetracking: {
		resourceUrl: `${resourceHost}trackedTime`,
		requestUrl: {
			list: `${resourceHost}trackedTime`,
			single: `${resourceHost}trackedTime`,
			billing: `${resourceHost}trackedTime/customer/`,
		},

		clientUrl: {
			billing: `/timetracking/billing/customer/`,
			multiple: "/timetrackings",
			single: `timetracking`,
			edit: `/timetracking/edit/`,
		},
	},

	defualtVatPercent: 18,
	vatPercentArray: ["0", "3", "5", "12", "18", "28", "40"],
	resetZeroVatPercentValues: { 3: 0.0, 5: 0.0, 12: 0.0, 18: 0.0, 28: 0.0, 40: 0.0 },
	currencyFormat: {
		symbol: "₹",
		format: "%v %s",
		decimal: ".",
		thousand: ",",
		precision: 2,
	},

	currencyFormats: {
		USD: {
			currency: {
				symbol: "$", // default currency symbol is '$'
				format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal: ".", // decimal point separator
				thousand: ",", // thousands separator
				precision: 2, // decimal places
			},
		},
		EUR: {
			currency: {
				symbol: "€", // default currency symbol is '$'
				format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal: ",", // decimal point separator
				thousand: ".", // thousands separator
				precision: 2, // decimal places
			},
		},
		CAD: {
			currency: {
				symbol: "$", // default currency symbol is '$'
				format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal: ".", // decimal point separator
				thousand: ",", // thousands separator
				precision: 2, // decimal places
			},
		},
		GBP: {
			currency: {
				symbol: "£", // default currency symbol is '$'
				format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal: ".", // decimal point separator
				thousand: ",", // thousands separator
				precision: 2, // decimal places
			},
		},
		AED: {
			currency: {
				symbol: "AED", // default currency symbol is '$'
				format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal: ".", // decimal point separator
				thousand: ",", // thousands separator
				precision: 2, // decimal places
			},
		},
		SGD: {
			currency: {
				symbol: "$", // default currency symbol is '$'
				format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal: ".", // decimal point separator
				thousand: ",", // thousands separator
				precision: 2, // decimal places
			},
		},
		MYR: {
			currency: {
				symbol: "RM", // default currency symbol is '$'
				format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal: ".", // decimal point separator
				thousand: ",", // thousands separator
				precision: 2, // decimal places
			},
		},
		PHP: {
			currency: {
				symbol: "₱", // default currency symbol is '$'
				format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal: ".", // decimal point separator
				thousand: ",", // thousands separator
				precision: 2, // decimal places
			},
		},
		BHD: {
			currency: {
				symbol: "BHD", // default currency symbol is '$'
				format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal: ".", // decimal point separator
				thousand: ",", // thousands separator
				precision: 2, // decimal places
			},
		},
		KWD: {
			currency: {
				symbol: "KWD", // default currency symbol is '$'
				format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal: ".", // decimal point separator
				thousand: ",", // thousands separator
				precision: 2, // decimal places
			},
		},
		OMR: {
			currency: {
				symbol: "OMR", // default currency symbol is '$'
				format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal: ".", // decimal point separator
				thousand: ",", // thousands separator
				precision: 2, // decimal places
			},
		},
		QAR: {
			currency: {
				symbol: "QAR", // default currency symbol is '$'
				format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal: ".", // decimal point separator
				thousand: ",", // thousands separator
				precision: 2, // decimal places
			},
		},
		SAR: {
			currency: {
				symbol: "SAR", // default currency symbol is '$'
				format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal: ".", // decimal point separator
				thousand: ",", // thousands separator
				precision: 2, // decimal places
			},
		},
		AUD: {
			currency: {
				symbol: "$", // default currency symbol is '$'
				format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal: ".", // decimal point separator
				thousand: ",", // thousands separator
				precision: 2, // decimal places
			},
		},
		// 'INR': {
		// 	currency: {
		// 		symbol : '₹',   // default currency symbol is '$'
		// 		format: '%s %v',
		// 		decimal: '.',
		// 		thousand: ',',
		// 		precision: 2
		// 	}
		// }
	},

	dateFormat: {
		api: "YYYY-MM-DD",
		client: "DD-MM-YYYY",
	},
	// move into lang resource file
	monthNames: [
		"Januar",
		"Februar",
		"März",
		"April",
		"Mai",
		"Juni",
		"Juli",
		"August",
		"September",
		"Oktober",
		"November",
		"Dezember",
	],
	// move into lang resource file
	weekdayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],

	dateEpochValue: "1899-12-30",
	datetimeEpochValue: "1899-12-30T00:00",

	datetimeFormat: {
		api: "YYYY-MM-DDTHH:mm",
		client: "H:mm",
	},

	documentTitleSuffix: "groflex",

	pikaday: {
		firstDay: 1,
		i18n: {
			previousMonth: "Zurück",
			nextMonth: "Vor",
			months: [
				"Januar",
				"Februar",
				"März",
				"April",
				"Mai",
				"Juni",
				"Juli",
				"August",
				"September",
				"Oktober",
				"November",
				"Dezember",
			],
			weekdays: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
			weekdaysShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
		},
	},

	owlCarousel: {
		dotClass: "carousel_dot",
		dotsClass: "carousel_dots",
		dragClass: "carousel_drag",
		grabClass: "carousel_grab",
		itemClass: "carousel_item",
		loadedClass: "carousel_loaded",
		loadingClass: "carousel_loading",
		navClass: ["carousel_prev", "carousel_next"],
		navContainerClass: "carousel_nav",
		refreshClass: "carousel_refresh",
		responsiveClass: "carousel_responsive",
		stageClass: "carousel_stage",
		stageOuterClass: "carousel_stageOuter",
		navText: ["", ""],
	},

	tagEditor: {
		animateDelete: 0,
		delimiter: ",",
		forceLowercase: false,
		maxLength: 30,
	},

	timeTypes: {
		FROM_TO: "fromDateTime_toDateTime",
		H_MIN: "h:mm",
	},

	passwordChecks: [
		// any password
		/^.*$/,
		// at least 8 characters, must include at least one of each lower case
		// letter and one upper case letter OR numeric digit
		/^(?=.*[a-z])((?=.*[A-Z])|(?=.*\d)).{8,}$/,
		// at least 8 characters, must include at least one lower case
		// letter and special character and one upper case letter OR or one numeric digit
		/^(?=.*[a-z])((?=.*[A-Z])|(?=.*\d))(?=.*[^A-Za-z0-9]).{8,}$/,
		// at least 12 characters, must include at least one lower case
		// letter and special character and one upper case letter OR or one numeric digit
		/^(?=.*[a-z])((?=.*[A-Z])|(?=.*\d))(?=.*[^A-Za-z0-9]).{12,}$/,
	],

	// emailCheck: /^([a-z0-9!#$%&'*+./=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z](?:[a-z-]*[a-z])$/i,
	emailCheck:
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,

	onlyNumberCheck: /^\d*\.?\d*$/,

	mobileNumberValidation: /^[6-9][0-9]{0,9}$/,

	ibanCheck: /^([A-Z]{2})(\d{2})(.+)$/,
	// move into lang resource file
	lang: {
		ibanHint: "Bitte gib eine valide IBAN ein!",
		emailHint: "Bitte gib eine valide E-Mail ein!",
		passwordHint: "Your password must contain at least 8 characters and one number or one capital letter!",
	},
	// move into lang resource file
	errorMsg: "Es tut uns leid, es gab einige technische Fehler! Bitte versuche es später noch einmal!",

	googleAPI: {
		url: "https://www.google.com/maps/embed/v1/place?key=",
		browserUrl: "https://www.google.com/maps?q=",
		iconUrl: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
		key: "AIzaSyD3p3sq26-teWD1Kpr_EpOjV52RpoMtgfE",
	},
	// move into lang resource file
	companyTypes: [
		{ label: "Kleinunternehmer", value: "smallbusiness" },
		{ label: "Freiberufler", value: "freelancer" },
		{ label: "Gewerbetreibender", value: "trader" },
		{ label: "Personengesellschaft", value: "partnership" },
		{ label: "Kapitalgesellschaft", value: "corporation" },
	],
	KEY_CODES: {
		ENTER: 13,
		DELETE: 46,
		TOP: 38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39,
		ESCAPE: 27,
		BACKSPACE: 8,
	},
	// move into lang resource file
	countries: [
		{ label: "Deutschland", iso2: "DE", iso3: "DEU" },
		// A
		{ label: "Afghanistan", iso2: "AF", iso3: "AFG" },
		{ label: "Ägypten", iso2: "EG", iso3: "EGY" },
		{ label: "Albanien", iso2: "AL", iso3: "ALB" },
		{ label: "Algerien", iso2: "DZ", iso3: "DZA" },
		{ label: "Amerikanisch-Samoa", iso2: "AS", iso3: "ASM" },
		{ label: "Amerikanische Jungferninseln", iso2: "VI", iso3: "VIR" },
		{ label: "Angola", iso2: "AO", iso3: "AGO" },
		{ label: "Anguilla", iso2: "AI", iso3: "AIA" },
		{ label: "Antarktis", iso2: "AQ", iso3: "ATA" },
		{ label: "Antigua und Barbuda", iso2: "AG", iso3: "ATG" },
		{ label: "Äquatorialguinea", iso2: "GQ", iso3: "GNQ" },
		{ label: "Argentinien", iso2: "AR", iso3: "ARG" },
		{ label: "Armenien", iso2: "AM", iso3: "ARM" },
		{ label: "Aruba", iso2: "AW", iso3: "ABW" },
		{ label: "Aserbaidschan", iso2: "AZ", iso3: "AZE" },
		{ label: "Äthiopien", iso2: "ET", iso3: "ETH" },
		{ label: "Australien", iso2: "AU", iso3: "AUS" },
		// B
		{ label: "Bahamas", iso2: "BS", iso3: "BHS" },
		{ label: "Bahrain", iso2: "BH", iso3: "BHR" },
		{ label: "Bangladesch", iso2: "BD", iso3: "BGD" },
		{ label: "Barbados", iso2: "BB", iso3: "BRB" },
		{ label: "Belarus", iso2: "BY", iso3: "BLR" },
		{ label: "Belgien", iso2: "BE", iso3: "BEL" },
		{ label: "Belize", iso2: "BZ", iso3: "BLZ" },
		{ label: "Benin", iso2: "BJ", iso3: "BEN" },
		{ label: "Bermuda", iso2: "BM", iso3: "BMU" },
		{ label: "Bhutan", iso2: "BT", iso3: "BTN" },
		{ label: "Bolivien", iso2: "BO", iso3: "BOL" },
		{ label: "Bosnien und Herzegowina", iso2: "BA", iso3: "BIH" },
		{ label: "Botswana", iso2: "BW", iso3: "BWA" },
		{ label: "Bouvetinsel", iso2: "BV", iso3: "BVT" },
		{ label: "Brasilien", iso2: "BR", iso3: "BRA" },
		{ label: "Britische Jungferninseln", iso2: "VG", iso3: "VGB" },
		{ label: "Brunei", iso2: "BN", iso3: "BRN" },
		{ label: "Bulgarien", iso2: "BG", iso3: "BGR" },
		{ label: "Burkina Faso", iso2: "BF", iso3: "BFA" },
		{ label: "Burundi", iso2: "BI", iso3: "BDI" },
		// C
		{ label: "Chile", iso2: "CL", iso3: "CHL" },
		{ label: "China", iso2: "CN", iso3: "CHN" },
		{ label: "Cookinseln", iso2: "CK", iso3: "COK" },
		{ label: "Costa Rica", iso2: "CR", iso3: "CRI" },
		{ label: "Curaçao", iso2: "CW", iso3: "CUW" },
		// D
		{ label: "Dänemark", iso2: "DK", iso3: "DNK" },
		{ label: "Demokratische Republik Kongo", iso2: "CD", iso3: "COD" },
		{ label: "Dominica", iso2: "DM", iso3: "DMA" },
		{ label: "Dominikanische Republik", iso2: "DO", iso3: "DOM" },
		{ label: "Dschibuti", iso2: "DJ", iso3: "DJI" },
		// E
		{ label: "Ecuador", iso2: "EC", iso3: "ECU" },
		{ label: "El Salvador", iso2: "SV", iso3: "SLV" },
		{ label: "Elfenbeinküste", iso2: "CI", iso3: "CIV" },
		{ label: "Eritrea", iso2: "ER", iso3: "ERI" },
		{ label: "Estland", iso2: "EE", iso3: "EST" },
		// F
		{ label: "Falklandinseln", iso2: "FK", iso3: "FLK" },
		{ label: "Färöer-Inseln", iso2: "FO", iso3: "FRO" },
		{ label: "Fidschi", iso2: "FJ", iso3: "FJI" },
		{ label: "Finnland", iso2: "FI", iso3: "FIN" },
		{ label: "Frankreich", iso2: "FR", iso3: "FRA" },
		{ label: "Französisch-Guayana", iso2: "GF", iso3: "GUF" },
		{ label: "Französisch-Polynesien", iso2: "PF", iso3: "PYF" },
		// G
		{ label: "Gabun", iso2: "GA", iso3: "GAB" },
		{ label: "Gambia", iso2: "GM", iso3: "GMB" },
		{ label: "Georgien", iso2: "GE", iso3: "GEO" },
		{ label: "Ghana", iso2: "GH", iso3: "GHA" },
		{ label: "Gibraltar", iso2: "GI", iso3: "GIB" },
		{ label: "Grenada", iso2: "GD", iso3: "GRD" },
		{ label: "Griechenland", iso2: "GR", iso3: "GRC" },
		{ label: "Grönland", iso2: "GL", iso3: "GRL" },
		{ label: "Guadeloupe", iso2: "GP", iso3: "GLP" },
		{ label: "Guam", iso2: "GU", iso3: "GUM" },
		{ label: "Guatemala", iso2: "GT", iso3: "GTM" },
		{ label: "Guinea", iso2: "GN", iso3: "GIN" },
		{ label: "Guinea-Bissau", iso2: "GW", iso3: "GNB" },
		{ label: "Guyana", iso2: "GY", iso3: "GUY" },
		// H
		{ label: "Haiti", iso2: "HT", iso3: "HTI" },
		{ label: "Honduras", iso2: "HN", iso3: "HND" },
		{ label: "Hongkong", iso2: "HK", iso3: "HKG" },
		// I
		{ label: "Indien", iso2: "IN", iso3: "IND" },
		{ label: "Indonesien", iso2: "ID", iso3: "IDN" },
		{ label: "Insel Man", iso2: "IM", iso3: "IMN" },
		{ label: "Irak", iso2: "IQ", iso3: "IRQ" },
		{ label: "Iran", iso2: "IR", iso3: "IRN" },
		{ label: "Irland", iso2: "IE", iso3: "IRL" },
		{ label: "Island", iso2: "IS", iso3: "ISL" },
		{ label: "Israel", iso2: "IL", iso3: "ISR" },
		{ label: "Italien", iso2: "IT", iso3: "ITA" },
		// J
		{ label: "Jamaika", iso2: "JM", iso3: "JAM" },
		{ label: "Japan", iso2: "JP", iso3: "JPN" },
		{ label: "Jemen", iso2: "YE", iso3: "YEM" },
		{ label: "Jersey", iso2: "JE", iso3: "JEY" },
		{ label: "Jordanien", iso2: "JO", iso3: "JOR" },
		// K
		{ label: "Kaimaninseln", iso2: "KY", iso3: "CYM" },
		{ label: "Kambodscha", iso2: "KH", iso3: "KHM" },
		{ label: "Kamerun", iso2: "CM", iso3: "CMR" },
		{ label: "Kanada", iso2: "CA", iso3: "CAN" },
		{ label: "Kap Verde", iso2: "CV", iso3: "CPV" },
		{ label: "Kasachstan", iso2: "KZ", iso3: "KAZ" },
		{ label: "Katar", iso2: "QA", iso3: "QAT" },
		{ label: "Kenia", iso2: "KE", iso3: "KEN" },
		{ label: "Kirgisistan", iso2: "KG", iso3: "KGZ" },
		{ label: "Kiribati", iso2: "KI", iso3: "KIR" },
		{ label: "Kokosinseln", iso2: "CC", iso3: "CCK" },
		{ label: "Kolumbien", iso2: "CO", iso3: "COL" },
		{ label: "Komoren", iso2: "KM", iso3: "COM" },
		{ label: "Kosovo", iso2: "XK", iso3: "" },
		{ label: "Kroatien", iso2: "HR", iso3: "HRV" },
		{ label: "Kuba", iso2: "CU", iso3: "CUB" },
		{ label: "Kuwait", iso2: "KW", iso3: "KWT" },
		// L
		{ label: "Laos", iso2: "LA", iso3: "LAO" },
		{ label: "Lesotho", iso2: "LS", iso3: "LSO" },
		{ label: "Lettland", iso2: "LV", iso3: "LVA" },
		{ label: "Libanon", iso2: "LB", iso3: "LBN" },
		{ label: "Liberia", iso2: "LR", iso3: "LBR" },
		{ label: "Libyen", iso2: "LY", iso3: "LBY" },
		{ label: "Liechtenstein", iso2: "LI", iso3: "LIE" },
		{ label: "Litauen", iso2: "LT", iso3: "LTU" },
		{ label: "Luxemburg", iso2: "LU", iso3: "LUX" },
		// M
		{ label: "Macau", iso2: "MO", iso3: "MAC" },
		{ label: "Madagaskar", iso2: "MG", iso3: "MDG" },
		{ label: "Malawi", iso2: "MW", iso3: "MWI" },
		{ label: "Malaysia", iso2: "MY", iso3: "MYS" },
		{ label: "Malediven", iso2: "MV", iso3: "MDV" },
		{ label: "Mali", iso2: "ML", iso3: "MLI" },
		{ label: "Malta", iso2: "MT", iso3: "MLT" },
		{ label: "Marokko", iso2: "MA", iso3: "MAR" },
		{ label: "Marshallinseln", iso2: "MH", iso3: "MHL" },
		{ label: "Martinique", iso2: "MQ", iso3: "MTQ" },
		{ label: "Mauretanien", iso2: "MR", iso3: "MRT" },
		{ label: "Mauritius", iso2: "MU", iso3: "MUS" },
		{ label: "Mayotte", iso2: "YT", iso3: "MYT" },
		{ label: "Mazedonien", iso2: "MK", iso3: "MKD" },
		{ label: "Mexiko", iso2: "MX", iso3: "MEX" },
		{ label: "Mikronesien", iso2: "FM", iso3: "FSM" },
		{ label: "Moldawien", iso2: "MD", iso3: "MDA" },
		{ label: "Monaco", iso2: "MC", iso3: "MCO" },
		{ label: "Mongolei", iso2: "MN", iso3: "MNG" },
		{ label: "Montenegro", iso2: "ME", iso3: "MNE" },
		{ label: "Montserrat", iso2: "MS", iso3: "MSR" },
		{ label: "Mosambik", iso2: "MZ", iso3: "MOZ" },
		{ label: "Myanmar", iso2: "MM", iso3: "MMR" },
		// N
		{ label: "Namibia", iso2: "NA", iso3: "NAM" },
		{ label: "Nauru", iso2: "NR", iso3: "NRU" },
		{ label: "Nepal", iso2: "NP", iso3: "NPL" },
		{ label: "Neukaledonien", iso2: "NC", iso3: "NCL" },
		{ label: "Neuseeland", iso2: "NZ", iso3: "NZL" },
		{ label: "Nicaragua", iso2: "NI", iso3: "NIC" },
		{ label: "Niederlande", iso2: "NL", iso3: "NLD" },
		{ label: "Niederländische Antillen", iso2: "AN", iso3: "ANT" },
		{ label: "Niger", iso2: "NE", iso3: "NER" },
		{ label: "Nigeria", iso2: "NG", iso3: "NGA" },
		{ label: "Niue", iso2: "NU", iso3: "NIU" },
		{ label: "Nördliche Marianen", iso2: "MP", iso3: "MNP" },
		{ label: "Nordkorea", iso2: "KP", iso3: "PRK" },
		{ label: "Norfolkinsel", iso2: "NF", iso3: "NFK" },
		{ label: "Norwegen", iso2: "NO", iso3: "NOR" },
		// O
		{ label: "Oman", iso2: "OM", iso3: "OMN" },
		{ label: "Österreich", iso2: "AT", iso3: "AUT" },
		// P
		{ label: "Pakistan", iso2: "PK", iso3: "PAK" },
		{ label: "Palästina", iso2: "PS", iso3: "PSE" },
		{ label: "Palau", iso2: "PW", iso3: "PLW" },
		{ label: "Panama", iso2: "PA", iso3: "PAN" },
		{ label: "Papua-Neuguinea", iso2: "PG", iso3: "PNG" },
		{ label: "Paraguay", iso2: "PY", iso3: "PRY" },
		{ label: "Peru", iso2: "PE", iso3: "PER" },
		{ label: "Philippinen", iso2: "PH", iso3: "PHL" },
		{ label: "Polen", iso2: "PL", iso3: "POL" },
		{ label: "Portugal", iso2: "PT", iso3: "PRT" },
		{ label: "Puerto Rico", iso2: "PR", iso3: "PRI" },
		// R
		{ label: "Réunion", iso2: "RE", iso3: "REU" },
		{ label: "Republik Kongo", iso2: "CG", iso3: "COG" },
		{ label: "Ruanda", iso2: "RW", iso3: "RWA" },
		{ label: "Rumänien", iso2: "RO", iso3: "ROU" },
		{ label: "Russland", iso2: "RU", iso3: "RUS" },
		// S
		{ label: "Salomonen", iso2: "SB", iso3: "SLB" },
		{ label: "Sambia", iso2: "ZM", iso3: "ZMB" },
		{ label: "Samoa", iso2: "WS", iso3: "WSM" },
		{ label: "San Marino", iso2: "SM", iso3: "SMR" },
		{ label: "São Tomé und Príncipe", iso2: "ST", iso3: "STP" },
		{ label: "Saudi-Arabien", iso2: "SA", iso3: "SAU" },
		{ label: "Schweden", iso2: "SE", iso3: "SWE" },
		{ label: "Schweiz", iso2: "CH", iso3: "CHE" },
		{ label: "Senegal", iso2: "SN", iso3: "SEN" },
		{ label: "Serbien", iso2: "RS", iso3: "SRB" },
		{ label: "Seychellen", iso2: "SC", iso3: "SYC" },
		{ label: "Sierra Leone", iso2: "SL", iso3: "SLE" },
		{ label: "Simbabwe", iso2: "ZW", iso3: "ZWE" },
		{ label: "Singapur", iso2: "SG", iso3: "SGP" },
		{ label: "Sint Maarten", iso2: "SX", iso3: "SXM" },
		{ label: "Slowakei", iso2: "SK", iso3: "SVK" },
		{ label: "Slowenien", iso2: "SI", iso3: "SVN" },
		{ label: "Somalia", iso2: "SO", iso3: "SOM" },
		{ label: "Spanien", iso2: "ES", iso3: "ESP" },
		{ label: "Sri Lanka", iso2: "LK", iso3: "LKA" },
		{ label: "St. Helena", iso2: "SH", iso3: "SHN" },
		{ label: "St. Kitts und Nevis", iso2: "KN", iso3: "KNA" },
		{ label: "St. Lucia", iso2: "LC", iso3: "LCA" },
		{ label: "St. Pierre und Miquelon", iso2: "PM", iso3: "SPM" },
		{ label: "St. Vincent und die Grenadinen", iso2: "VC", iso3: "VCT" },
		{ label: "Südafrika", iso2: "ZA", iso3: "ZAF" },
		{ label: "Südkorea", iso2: "KR", iso3: "KOR" },
		{ label: "Sudan", iso2: "SD", iso3: "SDN" },
		{ label: "Südgeorgien und die Südlichen Sandwichinseln", iso2: "GS", iso3: "SGS" },
		{ label: "Südsudan", iso2: "SS", iso3: "SSD" },
		{ label: "Suriname", iso2: "SR", iso3: "SUR" },
		{ label: "Swasiland", iso2: "SZ", iso3: "SWZ" },
		{ label: "Syrien", iso2: "SY", iso3: "SYR" },
		// T
		{ label: "Tadschikistan", iso2: "TJ", iso3: "TJK" },
		{ label: "Taiwan", iso2: "TW", iso3: "TWN" },
		{ label: "Tansania", iso2: "TZ", iso3: "TZA" },
		{ label: "Thailand", iso2: "TH", iso3: "THA" },
		{ label: "Togo", iso2: "TG", iso3: "TGO" },
		{ label: "Tokelau", iso2: "TK", iso3: "TKL" },
		{ label: "Tonga", iso2: "TO", iso3: "TON" },
		{ label: "Trinidad und Tobago", iso2: "TT", iso3: "TTO" },
		{ label: "Tschad", iso2: "TD", iso3: "TCD" },
		{ label: "Tschechien", iso2: "CZ", iso3: "CZE" },
		{ label: "Tunesien", iso2: "TN", iso3: "TUN" },
		{ label: "Türkei", iso2: "TR", iso3: "TUR" },
		{ label: "Turkmenistan", iso2: "TM", iso3: "TKM" },
		{ label: "Turks- und Caicosinseln", iso2: "TC", iso3: "TCA" },
		{ label: "Tuvalu", iso2: "TV", iso3: "TUV" },
		// U
		{ label: "Uganda", iso2: "UG", iso3: "UGA" },
		{ label: "Ukraine", iso2: "UA", iso3: "UKR" },
		{ label: "Ungarn", iso2: "HU", iso3: "HUN" },
		{ label: "Uruguay", iso2: "UY", iso3: "URY" },
		{ label: "Usbekistan", iso2: "UZ", iso3: "UZB" },
		// V
		{ label: "Vanuatu", iso2: "VU", iso3: "VUT" },
		{ label: "Vatikanstadt", iso2: "VA", iso3: "VAT" },
		{ label: "Venezuela", iso2: "VE", iso3: "VEN" },
		{ label: "Vereinigte Arabische Emirate", iso2: "AE", iso3: "ARE" },
		{ label: "Vereinigte Staaten von Amerika", iso2: "US", iso3: "USA" },
		{ label: "Vereinigtes Königreich", iso2: "GB", iso3: "GBR" },
		{ label: "Vietnam", iso2: "VN", iso3: "VNM" },
		// W
		{ label: "Wallis und Futuna", iso2: "WF", iso3: "WLF" },
		{ label: "Weihnachtsinsel", iso2: "CX", iso3: "CXR" },
		{ label: "Westsahara", iso2: "EH", iso3: "ESH" },
		// Z
		{ label: "Zentralafrikanische Republik", iso2: "CF", iso3: "CAF" },
		{ label: "Zypern", iso2: "CY", iso3: "CYP" },
	],
	states: [
		{ stateName: "Andaman and Nicobar Islan`ds" },
		{ stateName: "Andhra Pradesh" },
		{ stateName: "Arunachal Pradesh" },
		{ stateName: "Assam" },
		{ stateName: "Bihar" },
		{ stateName: "Chandigarh" },
		{ stateName: "Chhattisgarh" },
		{ stateName: "Dadra and Nagar Haveli" },
		{ stateName: "Daman and Diu" },
		{ stateName: "Delhi" },
		{ stateName: "Goa" },
		{ stateName: "Gujarat" },
		{ stateName: "Haryana" },
		{ stateName: "Himachal Pradesh" },
		{ stateName: "Jammu and Kashmir" },
		{ stateName: "Jharkhand" },
		{ stateName: "Karnataka" },
		{ stateName: "Kerala" },
		{ stateName: "Lakshadweep" },
		{ stateName: "Madhya Pradesh" },
		{ stateName: "Maharashtra" },
		{ stateName: "Manipur" },
		{ stateName: "Meghalaya" },
		{ stateName: "Mizoram" },
		{ stateName: "Nagaland" },
		{ stateName: "Odisha" },
		{ stateName: "Puducherry" },
		{ stateName: "Punjab" },
		{ stateName: "Rajasthan" },
		{ stateName: "Sikkim" },
		{ stateName: "Tamil Nadu" },
		{ stateName: "Telangana" },
		{ stateName: "Tripura" },
		{ stateName: "Uttarakhand" },
		{ stateName: "Uttar Pradesh" },
		{ stateName: "West Bengal" },
	],
	supportedLanguages: ["en", "de"],
};

export default config;

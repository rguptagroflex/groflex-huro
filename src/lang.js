export default {
	autoNumberPlaceholder: 'Autom. Vergabe',

	// default messages
	defaultTitle: 'Vorgang',
	defaultErrorMessage: 'Entschuldigung, es ist ein Fehler aufgetreten!',
	defaultSendEmailErrorMessage: 'Beim Versenden der E-Mail ist ein Fehler aufgetreten.',
	criticalErrorMessage: 'Es ist ein kritischer Fehler aufgetreten. Bitte melde dich bei unserem Support!',
	smallBusinessText: 'Als Kleinunternehmer im Sinne von § 19 Abs. 1 UStG wird keine Umsatzsteuer berechnet.',
	tokenExpiredMessage: 'Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.',
	emptyNotesMessage: 'Keine Anmerkungen vorhanden',

	// article
	articleDeleteConfirmCaption: 'Artikel löschen',
	articleDeleteConfirmText: 'Möchtest du den Artikel wirklich löschen? Dies kann nicht rückgängig gemacht werden!',
	articleDeleteSuccessMessage: 'Der Artikel wurde erfolgreich gelöscht',
	articleSaveSuccessMessage: 'Der Artikel wurde erfolgreich gespeichert',
	articleSaveDefaultErrorMessage: 'Beim Speichern des Artikels ist ein Fehler aufgetreten',
	articleNotesSaveSuccessMessage: 'Der Artikel wurde erfolgreich gespeichert',
	articleSearchCategory: 'Artikel',
	articleVatSmallBusinessHint:
		'Als Kleinunternehmer wird der Mehrwertsteuersatz in Angeboten und Rechnungen nicht berücksichtigt. Um aussagekräftige Statistiken zu erhalten, sollte der Mehrwertsteuersatz jedoch korrekt eingetragen werden.',
	// article - image
	articleImageUploadSuccessMessage: 'Das Artikelbild wurde erfolgreich hochgeladen',
	articleImageUploadDefaultError: 'Beim Hochladen des Artikelbildes ist ein Fehler aufgetreten',

	// account
	approveEmailInfoMessage: 'Bitte bestätige noch deine E-Mail Adresse.',
	registrationSuccess: 'Herzlich willkommen bei Invoiz. Schön, dass du da bist!',
	approveResendSuccess: 'Wir haben dir einen neuen Bestätigungslink gesendet.',

	// logo upload
	logoUploadMinWidthError: 'Dein Logo muß mindestens 100 Pixel breit sein!',
	logoUploadMaxWidthError: 'Dein Logo darf maximal 800 Pixel breit sein!',
	logoUploadMinHeightError: 'Dein Logo muß mindestens 100 Pixel hoch sein!',
	logoUploadMaxHeightError: 'Dein Logo darf maximal 600 Pixel hoch sein!',
	logoUploadMinSizeError: 'Dein Logo muß mindestens 2,5 kB groß sein!',
	logoUploadMaxSizeError: 'Die ausgewählte Datei überschreitet die maximal zulässige Größe von 10 MB.',
	logoUploadFileTypeError:
		'Das ausgewählte Dateiformat ist nicht zulässig. Bitte wähle eines der zulässigen Formate aus (JPG, PNG).',

	// customer
	customerDeleteConfirmCaption: 'Kunden löschen',
	customerDeleteConfirmText: 'Möchtest du den Kunden wirklich löschen? Dies kann nicht rückgängig gemacht werden!',
	customerDeleteSuccessMessage: 'Der Kunde wurde erfolgreich gelöscht',
	customerDeleteNotAllowedMessage: 'Der Kunde kann nicht gelöscht werden, da Zeiten für ihn erfasst wurden.',
	customersDeleteNotAllowedMessage:
		'Einige der Kunden können nicht gelöscht werden, da Zeiten für sie erfasst wurden.',
	customerSaveSuccessMessage: 'Der Kunde wurde erfolgreich gespeichert!',
	customerSaveErrorMessage: 'Beim Speichern des Kunden ist ein Fehler aufgetreten.',
	customerNotesSaveSuccessMessage: 'Das Kundenprofil wurde erfolgreich aktualisiert!',
	customerEditAndSaveInMasterDataSuccessMessage: 'Die Änderungen wurden in den Stammdaten gespeichert.',
	customerEditAndSaveInMasterDataErrorMessage:
		'Der Kontakt wurde nicht aktualisiert! Bitte versuche es später noch einmal.',
	customerSearchCategory: 'Kunden',
	getNextCustomerNumberErrorMessage: 'Beim ermitteln der nächsten Kundennummer ist ein Fehler aufgetreten',
	validateCustomerNumberErrorMessage: 'Beim validieren der Kundennummer ist ein Fehler aufgetreten',

	// contact person
	contactPersonInsideCustomerSaveSuccessMessage:
		'Der Ansprechpartner wurde aktualisiert. Bitte speichere den Kunden, um die Details zu aktualisieren!',

	// transaction
	transactionEmptyCustomerErrorMessage: 'Bitte füge einen Kunden zu %s hinzu.',
	transactionEmptyPositionsErrorMessage: 'Bitte füge mindestens eine Position zu %s hinzu.',
	transactionEmptyDeliveryConditionErrorMessage: 'Bitte füge eine Lieferbedingung zu %s hinzu',
	transactionEmptyPayConditionErrorMessage: 'Bitte füge eine Zahlungsbedingung zu %s hinzu.',
	transactionDiscountPercentErrorMessage: 'Der Rabatt einer Position muss größer als 0% und kleiner als 1000% sein!',

	// invoice
	invoiceTitle: 'Rechnung',
	invoiceDeleteConfirmCaption: 'Rechnung löschen',
	invoiceDeleteConfirmText: 'Möchtest du die Rechnung wirklich löschen? Dies kann nicht rückgängig gemacht werden!',
	invoiceDeleteSuccessMessage: 'Die Rechnung wurde erfolgreich gelöscht',
	invoiceEditLockedMessage: 'Die Rechnung wurde bereits abgeschlossen und kann nicht mehr bearbeitet werden.',
	invoiceEditCanceledMessage: 'Die Rechnung wurde bereits storniert und kann nicht mehr bearbeitet werden.',
	invoiceLockSuccessMessage: 'Die Rechnung wurde erfolgreich abgeschlossen.',
	invoiceSaveErrorMessage: 'Beim Speichern der Rechnung ist ein unerwarteter Fehler aufgetreten.',
	invoiceSaveSuccessMessage: 'Die Rechnung wurde erfolgreich gespeichert.',
	invoiceSearchCategory: 'Rechnungen',
	invoiceCancelSuccessMessage: 'Die Rechnung wurde erfolgreich storniert',
	invoiceHasPaymentsErrorMessage:
		'Zu der Rechnung existiert bereits mindestens eine Zahlung, daher kann diese nicht mehr storniert oder gelöscht werden.',
	cancellationDeleteErrorMessage: 'Eine Stornorechnung kann nicht gelöscht werden.',
	cancellationEditErrorMessage: 'Eine Stornorechnung kann nicht bearbeitet werden.',
	invoiceColumnEditSaveInSettingsLabel: 'als Standard für Rechnungen speichern',
	invoiceCopySuccessMessage: 'Die Rechnung wurde erfolgreich kopiert.',
	invoiceCopyErrorMessage: 'Beim Kopieren der Rechnung ist ein Fehler aufgetreten.',
	invoiceInfoDelDateHint: 'Es erscheint ein Hinweissatz im Schlusstext.',
	invoiceInfoDisabledDelDateHint:
		'Da Rechnungsdatum nicht dem Liefer-/Leistungsdatum entspricht, kannst du das Liefer-/Leistungsdatum nicht ausblenden.',
	noInvoicesLeftErrorMessage: 'Die Anzahl der maximalen Rechnungen für diesen Monat ist erreicht.',
	invoiceLockModalHeading: 'Prozess abschließen?',
	invoiceLockModalContentText:
		'Nach Abschluss des Prozesses, bist du nicht mehr in der Lage, die Rechnung zu bearbeiten. Dieser Vorgang kann nicht rückgängig gemacht werden.',

	// recurringInvoice
	recurringInvoiceCopySuccessMessage: 'Die Abo-Rechnung wurde erfolgreich kopiert.',
	recurringInvoiceCopyErrorMessage: 'Beim Kopieren der Abo-Rechnung ist ein Fehler aufgetreten.',
	recurringInvoiceDeleteSuccessMessage: 'Die Abo-Rechnung wurde erfolgreich gelöscht',
	recurringInvoiceDeleteConfirmCaption: 'Abo-Rechnung löschen',
	recurringInvoiceDeleteConfirmText:
		'Möchtest du die Abo-Rechnung wirklich löschen? Dies kann nicht rückgängig gemacht werden!',
	recurringLockModalHeading: 'Abo-Rechnung starten?',
	recurringLockModalContentText: 'Nach Start der Abo-Rechnung bist du nicht mehr in der Lage, diesen zu bearbeiten.',
	recurringInvoiceSaveSuccessMessage: 'Die Abo-Rechnung wurde erfolgreich gespeichert',
	recurringInvoiceSaveErrorMessage: 'Beim Speichern der Abo-Rechnung ist ein unerwarteter Fehler aufgetreten.',
	recurringInvoiceStartSuccessMessage: 'Die Abo-Rechnung wurde erfolgreich gestartet',
	recurringInvoiceStartErrorMessage: 'Die Abo-Rechnung konnte nicht gestartet werden',
	recurringInvoiceFinishSuccessMessage: 'Die Abo-Rechnung wurde erfolgreich beendet',
	recurringInvoiceFinishErrorMessage: 'Beim Beenden der Abo-Rechnung ist ein Fehler aufgetreten',
	recurringFinishConfirmCaption: 'Abo-Rechnung beenden',
	recurringFinishConfirmText:
		'Möchtest du die Abo-Rechnung wirklich beenden? Dies kann nicht rückgängig gemacht werden.',
	recurringInvoiceInvalidStartDateMessage:
		'Das Datum der erstmaligen Ausführung darf nicht in der Vergangenheit liegen',
	cancellationEmailHeadline: 'Da muss etwas korrigiert werden',
	cancellationEmailSubheadline: 'Versende deine Stornorechnung bequem per E-Mail',
	invoiceEmailHeadline: 'Zeit, sich bezahlen zu lassen',
	invoiceEmailSubheadline: 'Versende deine Rechnung bequem per E-Mail',
	invoiceAcceptPaymentMethodText:
		'Ich möchte mein Geld ca 11 Tage schneller erhalten und meinem Kunden erweiterte Zahlungsoptionen anbieten!*',
	invoiceDeclinePaymentMethodText:
		'Ich kann auf mein Geld warten und möchte die erweiterten Zahlungsoptionen nicht nutzen.',
	invoiceAcceptPaymentMethodAdditionalText:
		'*Für nur 2,4% + 0,25€ des Rechnungsbetrags bieten wir deinen Kunden die Möglichkeit, per Kreditkarten und weiteren populären Zahlungsarten zu bezahlen. Wir übernehmen Kreditkartengebühren, erfahre hier mehr über die erweiterten Zahlungsoptionen.',

	// depositInvoice
	depositInvoiceTitle: 'Abschlagsrechnung',
	depositInvoiceSaveSuccessMessage: 'Die Abschlagsrechnung wurde erfolgreich gespeichert',

	// closingInvoice
	closingInvoiceTitle: 'Schlussrechnung',

	// project
	projectMissingTitleMessage: 'Bitte gib einen Projektnamen ein',
	projectMissingBudgetMessage: 'Bitte gib ein Projektbudget ein',
	projectEditSuccessMessage: 'Die Änderungen wurden erfolgreich gespeichert',
	projectEditErrorMessage: 'Beim Speichern der Änderungen ist ein Fehler aufgetreten',
	projectDeleteSuccessMessage: 'Das Projekt wurde erfolgreich gelöscht',
	projectDeleteConfirmCaption: 'Projekt löschen',
	projectDeleteConfirmText: 'Das Projekt wurde erfolgreich gelöscht',

	// offer
	offerTitle: 'Angebot',
	offerToInvoiceSuccessMessage: 'Das Angebot wurde erfolgreich in eine Rechnung umgewandelt',
	offerDeleteConfirmCaption: 'Angebot %s löschen',
	offerDeleteConfirmText: 'Möchtest du das Angebot wirklich löschen? Dies kann nicht rückgängig gemacht werden!',
	offerDeleteSuccessMessage: 'Das Angebot %s wurde erfolgreich gelöscht',
	offerSaveErrorMessage: 'Beim Speichern des Angebots ist ein unerwarteter Fehler aufgetreten.',
	offerSaveSuccessMessage: 'Das Angebot wurde erfolgreich gespeichert.',
	offerEditLockedMessage: 'Das Angebot wurde bereits abgerechnet und kann nicht mehr bearbeitet werden.',
	offerDeleteLockedMessage: 'Das Angebot wurde bereits abgerechnet und kann nicht mehr gelöscht werden.',
	offerSearchCategory: 'Angebote',
	offerColumnEditSaveInSettingsLabel: 'als Standard für Angebote speichern',
	offerEmailHeadline: 'Zeit für einen neuen Auftrag',
	offerEmailSubheadline: 'Versende dein Angebot bequem per E-Mail',
	offerCopySuccessMessage: 'Das Angebot wurde erfolgreich kopiert.',
	offerCopyErrorMessage: 'Beim Kopieren des Angebots ist ein Fehler aufgetreten.',
	offerNumerationValuesExceeded:
		'Der Nummernkreis für Angebote ist erschöpft. Bitte nimm entsprechende Änderungen in den Nummernkreis-Einstellungen vor.',
	noOffersLeftErrorMessage: 'Die Anzahl der maximalen Angebote für diesen Monat ist erreicht.',

	// expense
	expenseDeleteSuccessMessage: 'Die Ausgabe wurde erfolgreich gelöscht',
	expenseDeleteConfirmCaption: 'Ausgabe löschen',
	expenseDeleteConfirmText: 'Möchtest du die Ausgabe wirklich löschen? Dies kann nicht rückgängig gemacht werden!',
	expenseSaveSuccessMessage: 'Die Ausgabe wurde erfolgreich gespeichert.',
	expenseSaveErrorMessage: 'Beim Speichern der Ausgabe ist ein Fehler aufgetreten.',
	// expense file upload messages
	expenseFileTypeError: "Die Datei '%s' hat keinen zulässigen Dateityp.",
	expenseFileMinSizeError: "Die Datei '%s' muss mindestens 2,5 kB groß sein!",
	expenseFileMaxSizeError: "Die Datei '%s' darf maximal 25 MB groß sein!",
	expenseFileSuccessMessage: 'Die Datei wurde erfolgreich hochgeladen',

	// dunning
	dunningModalContextText: 'Möchtest du zu der ausgewählten Rechnung eine Mahnung erstellen?',
	dunningCreateSuccessMessage: 'Die Zahlungserinnerung/Mahnung wurde erfolgreich erstellt.',
	dunningCreateErrorMessage: 'Beim Erstellen der Mahnung ist ein Fehler aufgetreten',
	dunnningEmailHeadline: 'Zeit, dein Geld einzufordern',
	dunnningEmailSubheadline: 'Versende deine Mahnung bequem per E-Mail',
	dunningLastActiveDunningLevelReachedMessage:
		'Die letzte aktive Mahnstufe ist erreicht. Gehe in die Rechnungsdetails um eine Mahnung erneut zu senden oder ändere die aktiven Mahnstufen in den Einstellungen.',
	dunninRecipientModalSaveSuccessMessage: 'Die Empfänger der Mahnungen wurden erfolgreich gespeichert',
	dunninRecipientModalSaveErrorMessage: 'Beim Speichern der Empfänger ist ein Fehler aufgetreten',
	dunninRecipientEmptyRecipientsErrorMessage:
		'Bitte gib mindestens einen Empfänger für den automatischen Mahnungsversand an',

	// time tracking
	timeTracking: {
		fromDateTime_toDateTime: 'Von - Bis',
		'h:mm': 'Std. / Min.',
		VALIDATION_DATETIME_FORMAT: 'Kein valides Zeitformat. Beispiel: "13:15" -> 13:15 Uhr',
		VALIDATION_DATETIME_COMPARISON: 'Der Zeitpunkt "Bis" darf nicht vor dem Zeitpunkt "Von" sein.',
		VALIDATION_TIMESTRING_FORMAT: 'Kein valides Zeitformat. Beispiel: "13:15" -> 13 Stunden und 15 Minuten',
		VALIDATION_CUSTOMER_EMPTY: 'Bitte wähle einen Kunden aus.',
		VALIDATION_DURATIONINMINUTES_ZERO: 'Bitte gib eine Zeit an.',
		VALIDATION_TIMETYPE_EMPTY: 'Bitte wähle ein Zeitformat. "Von - Bis" oder "Std. / Min."'
	},
	timeTrackingDeleteConfirmCaption: 'Erfasste Zeit löschen',
	timeTrackingDeleteConfirmText:
		'Möchtest du die erfasste Zeit wirklich löschen? Dies kann nicht rückgängig gemacht werden!',
	timeTrackingDeleteSuccessMessage: 'Die erfasste Zeit wurde erfolgreich gelöscht',
	timeTrackingSaveSuccessMessage: 'Die Zeit wurde erfolgreich erfasst!',
	timeTrackingSaveErrorMessage: 'Beim Speichern der Zeit ist ein Fehler aufgetreten.',

	// transaction (offer & invoice)
	transactionColumnEditAmountNotCheckedHint:
		'Wenn du diese Spalte ausblendest, muss eine Mengenangabe zumindest im Beschreibungstext stehen.',
	transactionColumnEditDifferentVatHint:
		'Du kannst diese Spalte nicht ausblenden, da du in dieser Rechnung unterschiedliche MwSt-Sätze benutzt.',
	transactionColumnEditUsedDiscountHint:
		'Du kannst diese Spalte nicht ausblenden, da du in dieser Rechnung mindestens einen Rabatt vergeben hast.',
	transactionSendEmailSuccessMessage: 'Die E-Mail wurde erfolgreich versendet.',
	transactionCustomFieldInfo: 'Es muss immer eine Bezeichnung zu einem Wert bestehen, damit das Feld angezeigt wird.',

	// letter
	letterHeaderSaveSuccessMessage: 'Der Briefpapier-Kopf wurde erfolgreich gespeichert',
	letterHeaderSaveErrorMessage: 'Beim Speichern des Briefpapier-Kopfes ist ein Fehler aufgetreten',
	letterFooterSaveSuccessMessage: 'Der Briefpapier-Fuß wurde erfolgreich gespeichert.',
	letterFooterSaveErrorMessage: 'Beim Speichern des Briefpapier-Fußes ist ein Fehler aufgetreten.',

	// template selection
	templateSelectionSaveSuccessMessage: 'Die Vorlage wurde erfolgreich gespeichert.',
	templateSelectionSaveErrorMessage: 'Beim Speichern der Vorlage ist ein Fehler aufgetreten.',
	templateSelectionApplyErrorMessage: 'Beim Anzeigen der Vorlage ist ein Fehler aufgetreten.',
	templateSelectionLoadErrorMessage:
		'Beim Laden der Designs ist ein Fehler aufgetreten.<br/>Bitte versuche es erneut',
	templateSelectionConfirmSaveMessage:
		'Beim Speichern des neuen Templates gehen deine vorhandenen Einstellungen verloren.',

	// empty list views
	emptyInvoiceListHeading: 'Noch keine Rechnungen vorhanden',
	emptyOfferListHeading: 'Noch keine Angebote vorhanden',
	emptyExpenseListHeading: 'Noch keine Ausgaben vorhanden',
	emptyArticleListHeading: 'Noch keine Artikel vorhanden',
	emptyCustomerListHeading: 'Noch keine Kunden vorhanden',
	emptyTimeTrackingListHeading: 'Noch keine Zeiten erfasst',
	emptyInvoiceListMessage: 'Jetzt deine erste Rechnung erstellen',
	emptyOfferListMessage: 'Jetzt dein erstes Angebot erstellen',
	emptyExpenseListMessage: 'Jetzt deine erste Ausgabe erfassen',
	emptyArticleListMessage: 'Lege deinen ersten Artikel an oder importiere deinen bestehenden Artikelstamm',
	emptyCustomerListMessage: 'Lege deinen ersten Kunden an oder importiere deinen bestehenden Kundenstamm',
	emptyTimeTrackingListMessage: 'Jetzt deine ersten Zeiten erfassen',
	emptyListButtonText: "Los geht's",

	// payment
	paymentSaveErrorMessage: 'Beim Zuweisen der Zahlung ist ein Fehler aufgetreten.',
	paymentSaveSuccessMessage: 'Zahlung wurde erfolgreich zugewiesen.',
	paymentDeviationError: 'Bitte wähle wie der Mehrbetrag verbucht werden soll.',
	paymentTimeoutMessage: 'Deine Sitzung ist abgelaufen.\nBitte logge dich ein, um die Zahlung zu erfassen.',

	// search
	searchFoundIn: 'Gefunden in',

	// settings - account
	accountEmailAlreadyExistsMessage: 'Zu der eingegebenen E-Mail-Adresse existiert bereits ein Konto',
	accountEmailApproveSuccess: 'Dein Konto wurde erfolgreich aktiviert.',
	accountEmailApproveError:
		'Bei der Aktivierung deines Accounts ist ein Fehler aufgetreten. Bitte versuche es erneut.',
	accountDetailsSuccessMessage: 'Deine Accountdaten wurden erfolgreich aktualisiert.',
	accountDetailsErrorMessage: 'Deine Accountdaten konnten nicht aktualisiert werden!',
	accountTaxSuccessMessage: 'Deine Steuereinstellungen wurden erfolgreich aktualisiert.',
	accountTaxErrorMessage: 'Deine Steuereinstellungen konnten nicht aktualisiert werden!',
	accountPasswordSuccessMessage: 'Dein Passwort wurde erfolgreich aktualisiert.',
	accountPasswordWrongPasswordMessage: 'Das alte Passwort ist nicht korrekt!',
	accountWrongPasswordMessage: 'Das von dir eingegebene Passwort ist nicht korrekt!',
	accountPasswordErrorMessage: 'Dein Passwort konnte nicht aktualisiert werden!',
	accountSendEmailSuccessMessage: 'E-Mail - Absender erfolgreich aktualisiert.',
	accountSendEmailErrorMessage: 'E-Mail - Absender konnte nicht aktualisiert werden!',
	accountDeleteConfirmSuccessMessage: 'Wir haben die Lösch-Anfrage erhalten, du erhältst in Kürze eine Bestätigung.',
	accountDeleteSuccessMessage: 'Dein Account wurde erfolgreich gelöscht.',
	accountDeleteErrorMessage: 'Fehler beim Löschen deines Accounts, bitte kontaktiere uns!',
	accountDeleteRequestExistsMessage: 'Für deinen Account wurde bereits eine Löschung beantragt.',
	accountDeleteReasonLabel:
		'Hilf uns, invoiz noch besser zu machen und teile uns mit, warum du deinen Account löschen möchtest.',
	accountEditEmailErrorMessage:
		'E-Mail-Adresse wurde nicht geändert, da die neue E-Mail-Adresse der bisherigen entspricht',
	accountSettingsHeading: 'Account',
	accountEmailSuccessMessage: 'Prüfe bitte deinen Posteingang zur Bestätigung der neuen E-Mail-Adresse!',
	accountEmailIsConfirmed: 'Deine E-Mail ist bereits bestätigt.',
	accountEmailErrorMessage: 'Bei der Änderung deiner E-Mail-Adresse ist ein Fehler aufgetreten.',
	accountEmailChangeSuccessMessage: 'Deine E-Mail-Adresse wurde erfolgreich geändert.',
	changeEmailSameAsCurrentError: 'Entspricht deiner aktuellen E-Mail-Adresse',
	changeEmailHint:
		'Hinweis: Bevor du dich mit deiner neuen E-Mail-Adresse anmelden kannst, musst du diese bestätigen. Hierfür schickt invoiz dir eine E-Mail mit einem Bestätigungs-Link.',
	changeEmailNotConfirmedMessage:
		'Bitte bestätige deine Registrierung. Prüfe dazu dein Postfach der aktuellen E-Mail Adresse.',

	// settings - bank data
	bankDetailsSuccessMessage: 'Deine Bankverbindung wurden erfolgreich aktualisiert.',
	bankDetailsErrorMessage: 'Deine Bankverbindung konnten nicht aktualisiert werden!',

	// settings - document export
	documentExportHeading: 'Steuerberater Export',
	documentExportInfoText:
		'Hier kannst du den Zeitraum für den Steuerberater Export auswählen.<br/>Dabei erzeugt invoiz eine ZIP-Datei mit zwei PDF- und CSV-Dateien, die deine gesamten Ausgaben und Rechnungen für den gewählten Zeitraum beinhalten.',
	documentExportCreateSuccess: 'Der Steuerberater Export wurde gestartet.',
	documentExportCreateError: 'Der Steuerberater Export konnte nicht gestartet werden.',
	documentExportSendSuccess: 'Der Steuerberater Export wurde erfolgreich versendet.',
	documentExportSendError: 'Der Steuerberater Export konnte nicht versendet werden. Bitte versuch es erneut.',

	// settings - delivery conditions
	deliveryConditionChangeDefaultSuccessMessage: 'Die Standard Lieferbedingung wurde erfolgreich geändert.',
	deliveryConditionCreateSuccessMessage: 'Die neue Lieferbedingung wurde erfolgreich gespeichert.',
	deliveryConditionDeleteDefaultErrorMessage: 'Du kannst die Standard Lieferbedingung nicht löschen.',
	deliveryConditionDeleteSuccessMessage: 'Die ausgewählte Lieferbedingung wurde erfolgreich gelöscht.',
	deliveryConditionSaveSuccessMessage: 'Die Lieferbedingung wurde erfolgreich gespeichert.',
	deliveryConditionHeading: 'Lieferbedingungen',

	// settings - pay conditions
	payConditionChangeDefaultSuccessMessage: 'Die Standard Zahlungsbedingung wurde erfolgreich geändert.',
	payConditionCreateSuccessMessage: 'Die neue Zahlungsbedingung wurde erfolgreich gespeichert.',
	payConditionDeleteDefaultErrorMessage: 'Du kannst die Standard Zahlungsbedingung nicht löschen.',
	payConditionDeleteSuccessMessage: 'Die ausgewählte Zahlungsbedingung wurde erfolgreich gelöscht.',
	payConditionSaveSuccessMessage: 'Die Zahlungsbedingung wurde erfolgreich gespeichert.',
	paymentConditionHeading: 'Zahlungsbedingungen',

	// settings - text modules
	textModulePlaceholderIntroductionText: 'Gib hier den Einleitungstext für %s ein',
	textModulePlaceholderConclusionText: 'Gib hier den Schlusstext für %s ein',
	textModulesPlaceholderEmailText: 'Gib hier den Standard-Text für den E-Mail-Versand ein',
	textModuleSaveSuccessMessage: 'Textbausteine für %s erfolgreich aktualisiert',
	textModuleSaveErrorMessage: 'Beim Speichern der Textbausteine für %s ist ein Fehler aufgetreten',
	textModuleHeading: 'Textbausteine',

	// settings - data import
	importFillDataModalTitle: 'Ausfüllen der EXCEL-Importvorlage',
	importFillDataModalHeader:
		'Um deine Kunden- oder Artikeldaten in invoiz zu importieren, musst du diese in die vorbereiteten EXCEL-Tabellen-Vorlagen einfügen.',
	importFillDataModalBody:
		'Öffne als nächstes die gerade heruntergeladene Datei mit EXCEL und füge dann deine Kunden-oder Artikeldaten anhand der Erklärungen ein, die Du in der EXCEL-Vorlage findest.',
	importFillDataModalFooter:
		'Nachdem du deine Daten vollständig eingefügt hast, speichere die EXCEL-Datei auf deiner Festplatte ab, um sie im nächsten Schritt in invoiz hochzuladen.',

	importCorrectDataModalTitle: 'Korrigieren deiner Import-Daten',
	importCorrectDataModalHeader: 'invoiz hat in den Daten deiner EXCEL Tabellen einige Fehler gefunden.',
	importCorrectDataModalBody:
		'Um diese zu korrigieren, öffne als nächstes die gerade heruntergeladene Datei mit EXCEL und suche dann nach den farbig markierten Zellen, in denen invoiz Fehler festgestellt hat. invoiz hat ebenfalls Fehlerhinweise hinzugefügt, die dir die jeweiligen Fehler genau erklären.',
	importCorrectDataModalFooter:
		'Nachdem du deine Daten vollständig korrigiert hast, speichere die EXCEL-Datei auf deiner Festplatte ab, um sie im nächsten Schritt erneut hochzuladen.',

	importDataSuccessMessage: 'Der Datenimport wurde erfolgreich beendet. [rowCount] [templateType] wurden importiert.',
	importFileUploadErrorMessage: 'Bei der ausgewählten Datei handelt es sich nicht um eine EXCEL-Datei.',
	importCancelErrorMessage: 'Der Import-Vorgang wurde abgebrochen.',
	importStartErrorMessage: 'Deine Daten konnten nicht gespeichert werden.',

	// settings - dunningSettings
	dunningSettingsSaveSuccessMessage:
		'Die Änderungen an den Einstellungen der <em>%s</em> wurden erfolgreich gespeichert.',
	dunningSettingsSaveErrorMessage: 'Beim Speichern der Änderungen der <em>%s</em> ist ein Fehler aufgetreten.',

	// settings - more settings
	moreSettingsHeading: 'Weitere Einstellungen',

	numerationStartvalueHeading: 'Startwert festlegen',
	numerationSaveSuccess: 'Die Nummernkreise wurden erfolgreich gespeichert.',
	numerationSaveError: 'Beim Speichern der Nummernkreise ist ein Fehler aufgetreten.',
	numerationSaveStartValueSuccess:
		'Der Startwert wurde aktualisiert. Bitte speichere den Nummernkreis, um den Startwert auf dem Server zu aktualisieren!',
	changeInvoiceNumberSuccessMessage: 'Die Rechnungs- und Angebotsnummer wurden erfolgreich geändert.',
	changeInvoiceNumberErrorMessage: 'Die Rechnungs- oder Angebotsnummer konnte nicht geändert werden.',
	numerationCounterLengthTooSmall:
		'Der Anzahl der ausgewählten Stellen der %s ist zu niedrig. Bitte wähle einen höheren Wert.',
	numerationStartValueTooSmall: 'Der Startwert der %s wurde bereits verwendet. Bitte wähle einen höheren Wert.',

	// select/tag input messages
	tagSaveErrorMessage: 'Beim Speichern ist ein Fehler aufgetreten',
	tagAddSuccessMessage: '%s <em>%s</em> wurde erfolgreich hinzugefügt',
	tagAddErrorMessage: 'Beim Hinzufügen ist ein Fehler aufgetreten',
	tagDeleteSuccessMessage: '%s <em>%s</em> wurde erfolgreich gelöscht',
	tagDeleteErrorMessage: 'Beim Löschen ist ein Fehler aufgetreten',
	tagUpdateSuccessMessage: '%s wurde erfolgreich geändert',
	tagUpdateErrorMessage: 'Beim Ändern ist ein Fehler aufgetreten',
	tagExistsMessage: '%s <em>%s</em> ist bereits vorhanden',
	tagDefaultHintMessage:
		'Tippe einfach in das Feld, um neue %s hinzuzufügen. Mit einem Klick auf einen bestehenden Eintrag kannst du diesen umbenennen. Durch Ziehen eines Eintrags an eine andere Position änderst du die Reihenfolge.',

	tagsSalutationAddSuccessMessage: 'Anrede <i>[tagName]</i> wurde hinzugefügt',
	tagsSalutationDeleteSuccessMessage: 'Anrede <i>[tagName]</i> wurde erfolgreich gelöscht',
	tagsSalutationExistsMessage: 'Die Anrede <i>[tagName]</i> ist bereits vorhanden',

	tagsTitleAddSuccessMessage: 'Titel <i>[tagName]</i> wurde hinzugefügt',
	tagsTitleDeleteSuccessMessage: 'Titel <i>[tagName]</i> wurde erfolgreich gelöscht',
	tagsTitleExistsMessage: 'Der Titel <i>[tagName]</i> ist bereits vorhanden',

	tagsPositionAddSuccessMessage: 'Position <i>[tagName]</i> wurde hinzugefügt',
	tagsPositionDeleteSuccessMessage: 'Position <i>[tagName]</i> wurde erfolgreich gelöscht',
	tagsPositionExistsMessage: 'Die Position <i>[tagName]</i> ist bereits vorhanden',

	tagsArticleUnitAddSuccessMessage: 'Einheit <i>[tagName]</i> wurde hinzugefügt',
	tagsArticleUnitDeleteSuccessMessage: 'Einheit <i>[tagName]</i> wurde erfolgreich gelöscht',
	tagsArticleUnitExistsMessage: 'Die Einheit <i>[tagName]</i> ist bereits vorhanden',

	tagsCustomerCategoryAddSuccessMessage: 'Kundenkategorie <i>[tagName]</i> wurde hinzugefügt',
	tagsCustomerCategoryDeleteSuccessMessage: 'Kundenkategorie <i>[tagName]</i> wurde erfolgreich gelöscht',
	tagsCustomerCategoryExistsMessage: 'Die Kundenkategorie <i>[tagName]</i> ist bereits vorhanden',

	tagsArticleCategoryAddSuccessMessage: 'Artikelkategorie <i>[tagName]</i> wurde hinzugefügt',
	tagsArticleCategoryDeleteSuccessMessage: 'Artikelkategorie <i>[tagName]</i> wurde erfolgreich gelöscht',
	tagsArticleCategoryExistsMessage: 'Die Artikelkategorie <i>[tagName]</i> ist bereits vorhanden',

	// premium
	premiumErrorButtonText: 'Schade!',
	premiumErrorHeading: 'Bezahlvorgang fehlgeschlagen',
	premiumErrorSubheading: 'Wir konnten deinen Account leider nicht aufwerten.',
	premiumSuccessButtonText: "Los geht's",
	premiumSuccessHeading: 'Bezahlvorgang erfolgreich!',
	premiumSuccessSubheading: 'Viel Spaß mit dem vollen Funktionsumfang von invoiz!',

	getSubscriptionStateErrorMessage:
		'Beim Aktualisieren der noch verbleibenden Rechnungen und Angebote ist ein Fehler aufgetreten.',

	// invoizPaY
	invoizPayOutstandingAmountTooSmall:
		'Um invoizPAY nutzen zu können, muss der Rechnungsbetrag mindestens 1€ betragen.',
	invoizPayInvoiceEditErrorMessage: 'Bearbeite die Rechnung und wähle aus ob du invoizPay benutzen möchtest.',
	invoizPayInvoiceText: 'Bezahlen Sie bequem online: ',
	invoizPayInvoiceErrorMessage: 'Wähle aus, ob du invoizPay nutzen möchtest.',
	invoizPayInvoiceUserAgreementErrorMessage: 'Bitte bestätige die Nutzungsbedingungen.',
	invoizPayInvoiceBankDataErrorMessage: 'Bitte vervollständige deine Bankdaten.',
	invoizPayInvoiceTotalGrossErrorMessage: 'Für invoizPAY muss der Rechnungsbetrag mind. 1€ betragen!',
	invoicePayCashDiscountSettingAmountTooLarge: 'Der Skontobetrag ist zu hoch!',
	invoicePayCashDiscountSettingAmountTooSmall: 'Der Skontobetrag darf nicht 0 sein!',
	invoicePayCashDiscountSettingDaysTooSmall: 'Die Skontofrist darf nicht 0 sein!',

	// notifications
	notificationSaveSuccesMessage: 'Die Einstellung wurde erfolgreich gespeichert.',
	notificationSaveErrorMessage: 'Beim Speichern der Einstellung ist ein Fehler aufgetreten.',

	// IBAN
	ibanErrorMessage: 'Bitte gib eine valide IBAN ein.'
};

export const updateStatusIconCellColumns = (evt, width) => {
	if (evt.column && evt.column.colId) {
		const columnStatusIcon = $(`.ag-root .ag-cell[col-id="${evt.column.colId}"]`).find('.cell-status-icon')[0];

		let columnStatusIconContainers = null;

		if (columnStatusIcon) {
			columnStatusIconContainers = $(`.ag-root .ag-cell[col-id="${evt.column.colId}"] .cell-status-icon`);

			if ($(columnStatusIcon).width() <= width) {
				columnStatusIconContainers.addClass('icon-only');
			} else {
				columnStatusIconContainers.removeClass('icon-only');
			}
		}
	}
};

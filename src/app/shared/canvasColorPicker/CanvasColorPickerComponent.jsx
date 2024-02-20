import React from 'react';

class CanvasColorPickerComponent extends React.Component {
	constructor(props) {
		super(props);

		this.changeColor = this.changeColor.bind(this);
		
		this.state = {
			maxSelectionSize: 1
		}
	}

	componentDidMount() {
		const { value, maxSelectionSize, disabled } = this.props;

		this.colorpicker = $(this.refs.colorPicker);

		this.colorpicker.spectrum({
			preferredFormat: 'hex',
			showInput: true,
			showPalette: true,
			showSelectionPalette: true,
			maxSelectionSize: maxSelectionSize || 1,
			palette: [],
			color: value || '#000000',
			showButtons: false,
			disabled: disabled || false,
			move: color => {
				this.changeColor(color);
			}
		});

		// this.state = {
		// 	maxSelectionSize: maxSelectionSize || 1
		// };

		this.setState({maxSelectionSize: maxSelectionSize || 1})
	}

	componentWillReceiveProps(newProps) {
		const { maxSelectionSize } = this.state;
		const { value, disabled } = newProps;

		$(this.colorpicker).removeAttr('disabled');
		this.colorpicker.spectrum('destroy');

		this.colorpicker.spectrum({
			preferredFormat: 'hex',
			showInput: true,
			showPalette: true,
			showSelectionPalette: true,
			maxSelectionSize,
			palette: [],
			color: value || '#000000',
			showButtons: false,
			disabled,
			move: color => {
				this.changeColor(color);
			}
		});
	}

	componentWillUnmount() {
		this.colorpicker.spectrum('destroy');
		this.colorpicker = undefined;
	}

	changeColor(color) {
		const { canvas, onChange } = this.props;
		const textElement = canvas && canvas.getActiveObject();

		if (canvas) {
			if (!textElement) {
				this.colorpicker.spectrum('hide');
				return;
			}

			textElement.setColor(color.toHexString());
			canvas.renderAll();
		} else {
			onChange && onChange(color.toHexString());
		}
	}

	render() {
		const { visible } = this.props;

		if (!visible && this.colorpicker) {
			this.colorpicker.spectrum('hide');
		}

		return (
			<div className={`letterHeaderTools_color ${!visible ? 'u_hidden' : ''}`}>
				<input ref="colorPicker" />
			</div>
		);
	}
}
export default CanvasColorPickerComponent;

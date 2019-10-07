import React from 'react'
// import ReactDOM from 'react-dom'
import Select from 'react-select'

class Selected extends React.Component {
    state = {
        value: { label: this.props.val, value: this.props.val },
    }

    options = [
        { label: 2021, value: 2021 },
        { label: 2020, value: 2020 },
        { label: 2019, value: 2019 },
    ]

    handleChange(value) {
        this.setState({ value: value })
    }

    render() {
        return (
            <Select
                options={this.options}
                value={this.state.value}
                onChange={value => this.handleChange(value)}
                // defaultValue={{ label: 2002, value: 2002 }}
            />
        )
    }
}

export default Selected;

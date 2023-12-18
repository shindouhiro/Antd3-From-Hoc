import React from 'react'

const createForm = (Cmp) => {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.options = {}
    }

    handleChange = (e) => {
      const { name, value } = e.target
      this.setState({
        [name]: value
      })
    }


    getFieldDecorator = (field, options) => (Com) => {
      this.options[field] = options
      return React.cloneElement(Com, {
        name: field,
        value: this.state[field] || '',
        onChange: this.handleChange
      })
    }
    getValues = () => {
      return this.state
    }

    setValues = (obj) => {
      this.setState(obj)
    }

    validateFields = (callback) => {
      const err = []
      for (let field in this.options) {
        // 判断state[field]是否是undefined
        // 如果是undefind err.push({[field]: 'err})
        if (this.state[field] === undefined) {
          err.push({
            [field]: "err"
          });
        }
      }
      if (err.length === 0) {
        // 校验成功
        console.log(this.state)
        callback(null, this.state);
      } else {
        callback(err, this.state);
      }
    }

    getFn = () => {
      return {
        form: {
          getFieldDecorator: this.getFieldDecorator,
          getValues: this.getValues,
          setValue: this.setValue,
          validateFields: this.validateFields
        }
      }
    }

    render() {
      return <Cmp {...this.props} {...this.getFn()} />
    }
  }
}

export default createForm

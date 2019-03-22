import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Button, Select, DatePicker, Row, Col,
} from 'antd';
import locale from 'antd/lib/date-picker/locale/pt_BR';

const { Option } = Select;

class FlightTableHeader extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { form, callback } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        callback(values);
      }
    });
  }

  renderOptions() {
    const { flightCompanies } = this.props;

    return flightCompanies.map(({ nome, aeroporto, cidade }) => (
      <Option key={aeroporto} value={aeroporto}>{`${aeroporto} - ${nome} (${cidade})`}</Option>
    ));
  }

  render() {
    const { form } = this.props;

    const { getFieldDecorator } = form;

    const options = this.renderOptions();

    return (
      <Form className="flight-search-form" onSubmit={this.handleSubmit}>
        <Row justify="center" type="flex">
          <Col lg={24} md={24} xs={24}>
            <Row justify="space-around" type="flex">
              <Col lg={12} md={12} xs={20}>
                <Row justify="space-between" type="flex">
                  <Col lg={11} md={11} xs={24}>
                    <Form.Item hasFeedback label="Origem">
                      {getFieldDecorator('origin', {
                        rules: [{ required: true, message: 'Selecione uma origem' }],
                      })(
                        <Select
                          className="select-companies"
                          filterOption={(txt, obj) =>
                            obj.props.children.toLocaleLowerCase().includes(txt.toLowerCase())
                          }
                          notFoundContent="Nenhum resultado encontrado"
                          placeholder="Aeroporto de origem"
                          showSearch
                        >
                          {options}
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>

                  <Col className="form-item" lg={11} md={11} xs={24}>
                    <Form.Item hasFeedback label="Destino">
                      {getFieldDecorator('destiny', {
                        rules: [{ required: true, message: 'Selecione um destino' }],
                      })(
                        <Select
                          className="select-companies"
                          filterOption={(txt, obj) =>
                            obj.props.children.toLocaleLowerCase().includes(txt.toLowerCase())
                          }
                          notFoundContent="Nenhum resultado encontrado"
                          placeholder="Aeroporto de destino"
                          showSearch
                        >
                          {options}
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col lg={12} md={12} xs={24}>
            <Row align="middle" justify="center" type="flex">
              <Col lg={12} md={12} xs={20}>
                <Row align="bottom" justify="space-around" type="flex">
                  <Col lg={11} md={11} xs={24}>
                    <Form.Item label="Data">
                      {getFieldDecorator('date', {
                        rules: [{ type: 'object', required: true, message: 'Selecione uma data' }],
                      })(<DatePicker format="DD/MM/YYYY" locale={locale} />)}
                    </Form.Item>
                  </Col>

                  <Col lg={11} md={11} xs={24}>
                    <Form.Item>
                      <Button htmlType="submit" type="primary">
                        {'Procurar Voos'}
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    );
  }
}

FlightTableHeader.propTypes = {};

export const WrappedFlightTableHeader = Form.create({ name: 'horizontal_login' })(
  FlightTableHeader,
);

FlightTableHeader.propTypes = {
  // highorder da lib antdesign
  callback: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  form: PropTypes.object.isRequired,
  flightCompanies: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string.isRequired,
      cidade: PropTypes.string.isRequired,
      aeroporto: PropTypes.string.isRequired,
    }),
  ),
};

FlightTableHeader.defaultProps = {
  flightCompanies: [],
};

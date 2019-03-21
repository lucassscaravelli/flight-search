import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Table, Empty } from 'antd';
import { WrappedFlightTableHeader } from './FlightTableHeader';
import { FlightScales } from './FlightScales';
import img from '../../../img/paper-plane-png-7.png';

const { Column } = Table;

export const FlightTable = ({
  data, isLoading, flightCompanies, searchCallback,
}) => (
  <Table
    dataSource={data}
    loading={isLoading}
    locale={{ emptyText: <Empty description="Sem dados para exibir" image={img} /> }}
    rowKey={record => `${record.origin}-${record.destiny}-${record.value}`}
    title={() => (
      <WrappedFlightTableHeader callback={searchCallback} flightCompanies={flightCompanies} />
    )}
  >
    <Column key="origin" dataIndex="origin" title="Origem" />
    <Column key="destiny" dataIndex="destiny" title="Destino" />
    <Column
      key="date"
      dataIndex="date"
      render={value => moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY')}
      title="Data"
    />

    <Column key="departureTime" dataIndex="departureTime" title="Saída" />
    <Column key="arrivalTime" dataIndex="arrivalTime" title="Chegada" />

    <Column
      key="duration"
      dataIndex="duration"
      sorter={(a, b) =>
        moment.duration(a.duration).asMinutes() - moment.duration(b.duration).asMinutes()
      }
      title="Duração"
    />
    <Column
      key="scales"
      dataIndex="scales"
      render={scales => <FlightScales scales={scales} />}
      sorter={(a, b) => a.scales.length + b.scales.length}
      title="Escalas"
    />

    <Column
      key="value"
      dataIndex="value"
      defaultSortOrder="ascend"
      render={value =>
        `R$ ${value
          .toFixed(2)
          .toString()
          .replace('.', ',')}`
      }
      sorter={(a, b) => a.value - b.value}
      title="Valor"
    />
  </Table>
);

FlightTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchCallback: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      origin: PropTypes.string.isRequired,
      destiny: PropTypes.string.isRequired,
      departureTime: PropTypes.string.isRequired,
      arrivalTime: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      scales: PropTypes.arrayOf(
        PropTypes.shape({
          voo: PropTypes.string.isRequired,
          origem: PropTypes.string.isRequired,
          destino: PropTypes.string.isRequired,
          saida: PropTypes.string.isRequired,
          chegada: PropTypes.string.isRequired,
          valor: PropTypes.number.isRequired,
        }),
      ).isRequired,
    }),
  ),
  flightCompanies: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string.isRequired,
      cidade: PropTypes.string.isRequired,
      aeroporto: PropTypes.string.isRequired,
    }),
  ),
};

FlightTable.defaultProps = {
  data: [],
  flightCompanies: [],
};

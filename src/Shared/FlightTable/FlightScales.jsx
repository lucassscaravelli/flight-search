import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Button, Icon } from 'antd';

export const FlightScales = ({ scales }) => (
  <div>
    {scales.length > 1 ? (
      <Popover
        content={(
          <table className="scales-table">
            <tr>
              <th className="trip-info">Escalas</th>
            </tr>
            {scales.map(({
              origem, destino, saida, chegada,
            }) => (
              <tr
                key={`${origem}-${destino}-${saida}-${chegada}`}
                data-testid={`${origem}-${destino}-${saida}-${chegada}`}
              >
                <td>
                  {`${origem} (${saida})`}
                  <Icon className="icon-trip" type="double-right" />
                  {`${destino} (${chegada})`}
                </td>
              </tr>
            ))}
          </table>
)}
      >
        <Button data-testid="popover-button" shape="circle">
          {scales.length - 1}
        </Button>
      </Popover>
    ) : (
      <span data-testid="empty-scales">-</span>
    )}
  </div>
);

FlightScales.propTypes = {
  scales: PropTypes.arrayOf(
    PropTypes.shape({
      voo: PropTypes.string.isRequired,
      origem: PropTypes.string.isRequired,
      destino: PropTypes.string.isRequired,
      saida: PropTypes.string.isRequired,
      chegada: PropTypes.string.isRequired,
    }),
  ),
};

FlightScales.defaultProps = {
  scales: [],
};

import React, { useContext } from 'react'
import { Table, Typography } from 'antd';

import EquipmentContext from '../Context/EquipmentContext'

const { Title } = Typography;

const AvailableEquipments = props => {
	//const { availableEquipments } = useContext(EquipmentContext)
	const columns = [{
		title: 'Equipment Id',
		dataIndex: 'eq_id',
		key: 'eq_id',
	}, {
		title: 'Equipment Brand',
		dataIndex: 'eq_brand',
		key: 'eq_brand',
	}, {
		title: 'Equipment Unit',
		dataIndex: 'eq_unit',
		key: 'eq_unit',
	}, {
		title: 'Equipment Model',
		dataIndex: 'eq_model',
		key: 'eq_model'
	}, {
		title: 'Equipment Serial',
		dataIndex: 'eq_serial',
		key: 'eq_serial'
	}, {
		title: 'Description',
		dataIndex: 'eq_description',
		key: 'eq_description',
	}, {
		title: 'Equipment Status',
		dataIndex: 'eq_status',
		key: 'eq_status'
	}];
	
	return (
		<>
			<Title level={2}>Available Equipments</Title>
			<Table columns={columns} />
		</>
	)
}

export default AvailableEquipments
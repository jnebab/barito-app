import React, { useContext } from 'react'
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {HistoryLogContext} from '../../Store'

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},
})

const HistoryLog = props => {
	const { classes } = props
	const [transactions, setTransactions] = useContext(HistoryLogContext)

	return (
		<div>
			<h2 style={{textAlign: 'center'}}>History Log</h2>
			<List className={classes.root} style={{ margin: '0 auto', maxWidth: '70vw'}}>
				{transactions.map((tr,i) => {
					const transaction = tr.transaction_type === 'add' ? 'NEW EQUIPMENT' : tr.transaction_type === 'reserve' ? 'EQUIPMENT RESERVATION' : tr.transaction_type === 'borrow' ? 'EQUIPMENT BORROWED' : 'EQUIPMENT RETURNED'
					const transactionDate = Date.parse(tr.transaction_date)
					const options = {
						year: 'numeric',
						month: 'numeric',
						day: 'numeric',
						hour: 'numeric',
						minute: 'numeric',
						second: 'numeric'
					}

					return (
						<ListItem key={i} alignItems="flex-start">
							<ListItemText
								secondary={
									<React.Fragment>
										<Typography variant="overline" className={classes.inline} color="textPrimary">
											{transaction}
										</Typography>
										<Typography variant="caption">{
										`
										Date: ${new Intl.DateTimeFormat('en-US', options).format(transactionDate)}
										Equipment: ${tr.transaction_item}
										`}
										{tr.transaction_user != null && `Released by/Received by: ${tr.transaction_user}`}</Typography>
									</React.Fragment>
								}
							/>
						</ListItem>
					)
				})}
		</List>
		</div>
	)
}

export default withStyles(styles)(HistoryLog)
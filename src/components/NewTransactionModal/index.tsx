import React, { FormEvent, useContext, useState } from 'react';
import Modal from 'react-modal';
import { api } from '../../services/api';
import { TransactionsContext } from '../../TransactionContext';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, RadioBox, TransactionTypeContainer } from './styles';
interface NewTransactionModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

export const NewTransactionModal = ({
	isOpen,
	onRequestClose,
}: NewTransactionModalProps) => {
	const { createTransaction } = useContext(TransactionsContext);

	const [title, setTitle] = useState<string>('');
	const [amount, setAmount] = useState<number>(0);
	const [category, setCategory] = useState<string>('');
	const [type, setType] = useState<string>('deposit');

	async function handleCreateNewTransaction(event: FormEvent) {
		event.preventDefault();

		await createTransaction({
			title,
			amount,
			category,
			type,
		});
		setTitle('');
		setAmount(0);
		setCategory('');
		setType('deposit');
		onRequestClose();
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName="react-modal-overlay"
			className="react-modal-content">
			<button type="button">
				<img
					src={closeImg}
					alt="Fechar modal"
					onClick={onRequestClose}
					className="react-modal-close"
				/>
			</button>
			<Container onSubmit={handleCreateNewTransaction}>
				<h2>Cadastrar transação</h2>
				<input
					placeholder="Título"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
				<input
					type="number"
					placeholder="Valor"
					value={amount}
					onChange={(event) => setAmount(Number(event.target.value))}
				/>

				<TransactionTypeContainer>
					<RadioBox
						isActive={type === 'deposit'}
						activeColor="green"
						type="button"
						onClick={() => {
							setType('deposit');
						}}>
						<img src={incomeImg} alt="Entrada" />
						<span>Entrada</span>
					</RadioBox>
					<RadioBox
						isActive={type === 'withdraw'}
						activeColor="red"
						type="button"
						onClick={() => {
							setType('withdraw');
						}}>
						<img src={outcomeImg} alt="Saída" />
						<span>Saída</span>
					</RadioBox>
				</TransactionTypeContainer>

				<input
					placeholder="Categoria"
					value={category}
					onChange={(event) => setCategory(event.target.value)}
				/>
				<button type="submit">Cadastrar</button>
			</Container>
		</Modal>
	);
};

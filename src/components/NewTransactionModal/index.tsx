import React, { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { Container, RadioBox, TransactionTypeContainer } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
interface NewTransactionModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

export const NewTransactionModal = ({
	isOpen,
	onRequestClose,
}: NewTransactionModalProps) => {
	const [title, setTitle] = useState<string>('');
	const [value, setValue] = useState<number>(0);
	const [category, setCategory] = useState<string>('');
	const [type, setType] = useState<string>('deposit');

	function handleCreateNewTransaction(event: FormEvent) {
		event.preventDefault();
		console.log(title, value, category, type);
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
					value={value}
					onChange={(event) => setValue(Number(event.target.value))}
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

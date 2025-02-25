import { useForm } from 'react-hook-form';
import styles from './App.module.css';

export const App = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			password2: '',
		},
		mode: 'onChange',
	});

	const emailProps = {
		minLength: {
			value: 3,
			messages: 'Неверный email. Должно быть больше 3 символов.',
		},
		maxLength: {
			value: 30,
			messages: 'Неверный email. Должно быть меньше 30 символов.',
		},
		pattern: {
			value: /^[a-zA-Z0-9_@.]+$/,
			messages:
				'Неверный email.Допустимые символы - латинские буквы, цифры и нижнее подчеркивание',
		},
	};

	const errorEmail = errors.email?.message;

	const onSubmit = (formData) => {
		console.log(formData);
	};

	const passwordProps = {
		minLength: {
			value: 5,
			messages: 'Пароль должен быть не менее 5 символов.',
		},
	};
	const errorPassword = errors.password?.message;
	const errorPassword2 = errors.password2?.message;

	const handleReset = () => {
		reset();
	};

	return (
		<div>
			Сайт для регистрации
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					className={styles.input}
					type="email"
					name="email"
					placeholder="Почта"
					{...register('email', emailProps)}
				/>
				{errorEmail && <div className={styles.error}>{errorEmail}</div>}
				<input
					className={styles.input}
					type="password"
					name="password"
					placeholder="Пароль"
					{...register('password', passwordProps)}
				/>
				{errorPassword && <div className={styles.error}>{errorPassword}</div>}
				<input
					className={styles.input}
					type="password"
					name="password2"
					placeholder="Повторите пароль"
					{...register('password2', passwordProps)}
				/>
				{errorPassword2 && <div className={styles.error}>{errorPassword2}</div>}
				<button className={styles.button} type="button" onClick={handleReset}>
					Сброс
				</button>
				<button
					className={styles.button}
					type="submit"
					disabled={!!errorEmail || !!errorPassword || !!errorPassword2}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

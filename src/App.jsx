import { useForm } from 'react-hook-form';
import styles from './App.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const passwordAndEmailValidationScheme = yup.object().shape({
	email: yup
		.string()
		.required('Пожалуйста, введите email')
		.matches(
			/^[a-zA-Z0-9_@.]+$/,
			'Неверный email. Допустимые символы - латинские буквы, цифры и нижнее подчеркивание',
		)
		.max(30, 'Неверный email. Должно быть меньше 30 символов.')
		.min(3, 'Неверный email. Должно быть больше 3 символов.'),
	password: yup.string().min(5, 'Пароль должен быть не менее 5 символов.'),
	password2: yup
		.string()
		.min(5, 'Пароль должен быть не менее 5 символов.')
		.oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

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
		resolver: yupResolver(passwordAndEmailValidationScheme),
	});

	const onSubmit = (formData) => {
		console.log(formData);
	};

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
					{...register('email')}
				/>

				{errors.email?.message && (
					<div className={styles.error}>{errors.email.message}</div>
				)}
				<input
					className={styles.input}
					type="password"
					name="password"
					placeholder="Пароль"
					{...register('password')}
				/>
				{errors.password?.message && (
					<div className={styles.error}>{errors.password.message}</div>
				)}
				<input
					className={styles.input}
					type="password"
					name="password2"
					placeholder="Повторите пароль"
					{...register('password2')}
				/>
				{errors.password2?.message && (
					<div className={styles.error}>{errors.password2.message}</div>
				)}
				<button className={styles.button} type="button" onClick={handleReset}>
					Сброс
				</button>
				<button
					className={styles.button}
					type="submit"
					disabled={!!errors.email || !!errors.password || !!errors.password2}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

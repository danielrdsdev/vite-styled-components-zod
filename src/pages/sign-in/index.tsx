import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, redirect } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../../components/button";
import { FormGroup } from "../../components/form/form-group";
import { Input } from "../../components/form/input";
import { PasswordIcon } from "../../components/form/password-icon";
import { LoadingIcon } from "../../components/loading-icon";
import { Separator } from "../../components/separator";
import { useHandlePasswordIcon } from "../../hooks/useHandlePasswordIcon";
import { delay } from "../../utils/delay";
import {
	CTALink,
	Container,
	ErrorMessage,
	ForgotPasswordLink,
	FormContainer,
} from "./styles";

type FormSchema = z.infer<typeof formSchema>;

const formSchema = z.object({
	email: z.string().email("Email invalido"),
	password: z
		.string()
		.min(1, "Campo obrigatório")
		.max(24, "Máximo de caracteres atingido"),
});

export const SignIn = () => {
	const { handlePassword, typeInput, togglePassword } = useHandlePasswordIcon();

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: FormSchema) {
		await delay(2000);

		reset();

		console.log(values);

		toast("Login efetuado com sucesso", {
			description: "Seja bem-vindo(a)",
		});

		redirect("/dashboard");
	}

	return (
		<Container>
			<FormContainer>
				<h1>Acesse sua conta</h1>

				<form onSubmit={handleSubmit(onSubmit)}>
					<FormGroup>
						<label htmlFor="email">E-mail</label>
						<Input
							id="email"
							placeholder="exemplo@dominio.com"
							{...register("email")}
						/>
						{errors && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
					</FormGroup>
					<FormGroup>
						<label htmlFor="password">Senha</label>
						<div>
							<Input
								id="password"
								placeholder="Digite sua senha"
								type={typeInput}
								{...register("password")}
							/>
							<PasswordIcon onClick={togglePassword} type="button">
								{handlePassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</PasswordIcon>
						</div>
						{errors && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
					</FormGroup>

					<ForgotPasswordLink>
						<Link to="/forgot-password">Esqueceu sua senha?</Link>
					</ForgotPasswordLink>

					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? <LoadingIcon /> : "Entrar"}
					</Button>
				</form>

				<Separator />

				<CTALink>
					Não possui uma conta?{" "}
					<Link to="/sign-up">
						Cadastre-se agora!
						<ArrowRight size={18} />
					</Link>
				</CTALink>
			</FormContainer>
		</Container>
	);
};

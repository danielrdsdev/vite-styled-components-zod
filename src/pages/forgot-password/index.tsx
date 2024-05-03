import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, redirect } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../../components/button";
import { FormGroup } from "../../components/form/form-group";
import { Input } from "../../components/form/input";
import { LoadingIcon } from "../../components/loading-icon";
import { Separator } from "../../components/separator";
import { delay } from "../../utils/delay";
import { CTALink, Container, ErrorMessage, FormContainer } from "./styles";

type FormSchema = z.infer<typeof formSchema>;

const formSchema = z.object({
	email: z.string().email("Email invalido"),
});

export const ForgotPassword = () => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(values: FormSchema) {
		await delay(2000);

		reset();

		console.log(values);

		toast("Email enviado", {
			description: "Confira sua caixa de entrada para redefinir sua senha",
		});

		redirect("/");
	}
	return (
		<Container>
			<FormContainer>
				<h1>Recuperar senha</h1>

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

					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? <LoadingIcon /> : "Enviar"}
					</Button>
				</form>

				<Separator />

				<CTALink>
					Voltar para o{" "}
					<Link to="/">
						Login
						<ArrowRight size={18} />
					</Link>
				</CTALink>
			</FormContainer>
		</Container>
	);
};

import PageSkeleton from '@components/layout/page_layout';
import { Metadata } from 'next';
import { baseName } from '@lib/utils';
import LoginForm from '@components/forms/login-form';

export const metadata: Metadata = {
	title: baseName + ' | ' + 'Login',
	description: 'Login to use all features',
};

export default function Login() {
	return (
		<PageSkeleton>
			<LoginForm />
		</PageSkeleton>
	);
}

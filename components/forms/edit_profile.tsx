'use client';

import { Button } from '@components/ui/button';
import Dropbox from '@components/ui/dropbox';
import Input from '@components/interactive/input';
import { ChangeEvent, useState } from 'react';
import { fetchAccount } from '@/miscs/fetchData';

interface FormProps {
	firstname?: string;
	lastname?: string;
	username?: string;
	password?: string;
	avatar?: File;
	avatarMeta?: any;
	banner?: File;
	bannerMeta?: any;
}

export default function EditProfileForm() {
	const [Form, setForm] = useState<FormProps>({
		firstname: '',
		lastname: '',
		username: '',
	});
	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		setForm({ ...Form, [e.target.id]: e.target.value });
	}
	function handleFileComplete(name: string, data: { data: any; file: File }) {
		console.log({ [name]: data.data, [name + 'Meta']: data.file });
		setForm({ ...Form, [name]: data.data, [name + 'Meta']: data.file });
	}
	async function handleSubmit() {
		const formData = new FormData();
		Object.entries(Form).forEach((obj) => formData.append(obj[0], obj[1]));
		const res = await fetchAccount.put(formData).then((res) => res.data);
		console.log(res);
	}
	return (
		<article className='flex flex-col justify-between h-full'>
			<div className='grid grid-cols-2 gap-5 *:flex *:flex-col *:items-start *:gap-1'>
				<div>
					<label htmlFor='firstname'>Change first name</label>
					<Input id='firstname' onChange={handleInputChange} value={Form.firstname} />
				</div>
				<div>
					<label htmlFor='lastname'>Change last name</label>
					<Input id='lastname' onChange={handleInputChange} value={Form.lastname} />
				</div>
				<div>
					<label htmlFor='username'>Change username</label>
					<Input id='username' onChange={handleInputChange} value={Form.username} />
				</div>
				<div>
					<label htmlFor='password'>Change password</label>
					<Input id='password' onChange={handleInputChange} value={Form.password} />
				</div>
				<div>
					<label htmlFor='avatar'>Change avatar</label>
					<Dropbox onComplete={handleFileComplete} circularCrop aspect={1} id='avatar' />
				</div>
				<div>
					<label htmlFor='banner'>Change banner</label>
					<Dropbox onComplete={handleFileComplete} aspect={3} id='banner' />
				</div>
			</div>
			<div className='col-span-2 justify-end gap-5!'>
				<Button onClick={() => handleSubmit()}>Save changes</Button>
			</div>
		</article>
	);
}

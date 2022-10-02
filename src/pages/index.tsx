import {GetServerSideProps} from 'next';
import {useState} from 'react';
import {HexColorInput, HexColorPicker} from 'react-colorful';
import {getTheme, Hex} from '../utils/color';

interface Props {
	startingColor: Hex;
}

export default function Home(props: Props) {
	const [color, setColor] = useState(props.startingColor);
	const theme = getTheme(color);

	return (
		<div className="max-w-4xl mx-auto space-y-8 py-16 px-4">
			<h1 className="text-4xl font-bold text-center">
				Brightness aware Tailwind shade Generator
			</h1>

			<div className="flex space-x-4">
				<div>
					<div className="border shrink-0 border-neutral-300 p-2 pb-0 dark:border-neutral-700 dark:bg-neutral-800 rounded-xl overflow-hidden">
						<HexColorPicker
							color={color}
							onChange={color => setColor(color as Hex)}
						/>

						<div className="py-2">
							<HexColorInput
								prefixed
								color={color}
								onChange={color => setColor(color as Hex)}
								className="w-full dark:bg-neutral-800 text-center p-2 text-neutral-800 focus:outline-none border rounded-md border-neutral-300 dark:border-neutral-700 dark:text-neutral-400 focus:border-blue-500"
							/>
						</div>
					</div>
				</div>

				<div className="space-y-4 w-full">
					<pre className="bg-neutral-50 overflow-x-auto w-full p-4 rounded-lg border border-neutral-300 dark:bg-neutral-800 dark:border-neutral-700">
						{JSON.stringify(
							{
								[theme.name]: theme.palette,
							},
							null,
							'\t',
						)}
					</pre>

					<div className="p-4 bg-neutral-50 rounded-lg border border-neutral-300 dark:bg-neutral-800 dark:border-neutral-700">
						<p>
							Targeting brightness level{' '}
							<span className="font-bold">{theme.target}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	return {
		props: {
			startingColor: ('#' +
				((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')) as Hex,
		},
	};
};

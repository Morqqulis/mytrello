/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cloud.appwrite.io',
				pathname: '**',
			},
            {
                protocol: 'https',
                hostname: 'links.papareact.com',
                pathname: '**',
            }
		],
	},
}

export default nextConfig

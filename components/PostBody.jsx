// components/PostBody.jsx (Server Component)
import { MDXRemote } from "next-mdx-remote/rsc";

// Optional: map custom MDX components (code blocks, images, callouts, etc.)
const components = {
  // h2: (props) => <h2 style={{ marginTop: 32 }} {...props} />,
};

export default function PostBody({ source }) {
  return <MDXRemote source={source} components={components} />;
}

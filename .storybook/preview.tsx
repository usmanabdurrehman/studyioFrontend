import { ChakraProvider } from "@chakra-ui/react";
import type { Preview } from "@storybook/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={new QueryClient({})}>
        <ChakraProvider>
          <Story />
        </ChakraProvider>
      </QueryClientProvider>
    ),
  ],
};

export default preview;

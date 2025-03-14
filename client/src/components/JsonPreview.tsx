import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Code,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

type JsonPreviewProps = {
  data: any;
};

export function JsonPreview({ data }: JsonPreviewProps) {
  const [jsonString, setJsonString] = useState("");
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setJsonString(JSON.stringify(data, null, 2));
  }, [data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    });
  };

  return (
    <Dialog.Root size="xl">
      <Dialog.Trigger colorScheme="blue">Переглянути JSON</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>JSON Preview</Dialog.Title>
              <Dialog.CloseTrigger>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <Text mb={2} fontSize="sm" color="gray.500">
                Попередній вигляд даних JSON, які будуть надсилатися в мобільний
                застосунок:
              </Text>
              <Box
                bg="gray.50"
                p={4}
                borderRadius="md"
                overflowX="auto"
                maxHeight="60vh"
              >
                <Code display="block" whiteSpace="pre" fontSize="sm">
                  {jsonString}
                </Code>
              </Box>
            </Dialog.Body>
            <Dialog.Footer>
              <Button colorScheme="blue" mr={3} onClick={handleCopy}>
                {hasCopied ? "Скопійовано!" : "Копіювати JSON"}
              </Button>
              <Dialog.ActionTrigger>
                <Button variant="ghost">Закрити</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

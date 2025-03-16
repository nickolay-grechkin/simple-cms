import { CloseButton, Dialog, Portal, Code, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { RegularButton } from "../RegularButton/RegularButton";
import { LuView } from "react-icons/lu";
import { Screen } from "../../types";

type JsonPreviewProps = {
  data: Screen;
};

export const JsonPreview: React.FC<JsonPreviewProps> = ({ data }) => {
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
      <Dialog.Trigger colorScheme="blue">
        <RegularButton
          onClick={() => {}}
          text="Переглянути JSON"
          icon={LuView}
        />
      </Dialog.Trigger>
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
              <Dialog.ActionTrigger>
                <RegularButton onClick={() => {}} text="Закрити" />
              </Dialog.ActionTrigger>
              <RegularButton
                variant="primary"
                onClick={handleCopy}
                text={hasCopied ? "Скопійовано!" : "Копіювати JSON"}
                maxWidth="150px"
              />
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

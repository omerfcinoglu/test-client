import { Button } from "@heroui/button";

interface EditableButtonsProps {
    onEditButtonClick: () => void;
    onDeleteButtonClick: () => void;
}

const EditableButtons: React.FC<EditableButtonsProps> = ({
    onEditButtonClick,
    onDeleteButtonClick
}) => (
    <>
        <Button
            onPress={onEditButtonClick}
            variant="flat"
            radius="lg"
            size="sm"
            className="bg-blue-600 text-white"
        >
            Edit
        </Button>
        <Button
            onPress={onDeleteButtonClick}
            variant="flat"
            radius="lg"
            size="sm"
            className="bg-red-600 text-white"
        >
            Delete
        </Button>
    </>
)

export default EditableButtons;
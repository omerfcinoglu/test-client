import { Member } from '@/interfaces/IMember'
import { Card, CardFooter, Image, Spacer } from '@heroui/react'
import DetailsButton from './Buttons/DetailsButton';
import EditableButtons from './Buttons/EditableButtons';

interface CardProps {
    member: Member,
    isEditable: boolean,
    onSeeDetails?: () => void;
    onEditMode?: () => void;
    onDeleteMode?: () => void;
}

const MemberCard = ({
    member,
    isEditable,
    onSeeDetails,
    onEditMode,
    onDeleteMode
}: CardProps) => {
    const getImagePath = (path: string) => path.replace(/^public\//, '/');

    return (
        <Card
            isFooterBlurred
            className="m-4 p-4 border-none w-[400px] md:w-[400px] lg:w-[400px] items-center"
            radius="lg"
        >
            <Image
                alt="Member Image"
                className="object-cover"
                height={300}
                src={getImagePath(member.image)}
                width={300}
            />
            <Spacer y={10} />
            <CardFooter className="justify-between before:bg-white/25 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold text-dark dark:text-white">{member.name}</h1>
                    <p className="text-tiny text-center text-dark dark:text-white">{member.role}</p>
                </div>
                {isEditable
                    ? <EditableButtons
                        onEditButtonClick={onEditMode!}
                        onDeleteButtonClick={onDeleteMode!}
                    />
                    : <DetailsButton
                        onButtonClick={onSeeDetails!}
                    />
                }
            </CardFooter>
        </Card>
    )
}

export default MemberCard

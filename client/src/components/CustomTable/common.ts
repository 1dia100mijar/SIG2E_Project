
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const Icons = {
    edit: EditIcon,
    delete: DeleteIcon
}

export type Actions = {
    edit: () => void,
    delete: () => void
}
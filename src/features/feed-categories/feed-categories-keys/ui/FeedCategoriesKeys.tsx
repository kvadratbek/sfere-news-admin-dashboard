import { Button } from '@/shared/ui/button'
import { Key } from 'lucide-react'
import { IFeedCategory_ID_Keys } from '../model/type'
import { useNavigate } from 'react-router-dom'

export const FeedCategoriesKeys = ({category_id}: IFeedCategory_ID_Keys) => {
    const CategoryIdStringfied = category_id.toString()
    const navigate = useNavigate();
    const handleViewKeys = () => {
        navigate(`/feed-categories/${CategoryIdStringfied}`)
    }
  return (
    <Button
     className='cursor-pointer'
     variant="outline"
     onClick={handleViewKeys}
    >
        <Key/>
    </Button>
  )
}

import User from '@/utils/dto/User'

export default interface ContactForm {
    guidId: string
    message: string | null
    contactEmail: string | null
    firstName: string | null
    lastName: string | null
    websiteUrl: string | null
    attachmentGuidIds: string[]
    attachmentUrls: string[]
    user: User
}

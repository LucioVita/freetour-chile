import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://freewalkingtoursantiago.cl'

    // Define tours slugs manually as per current project implementation
    const tours = [
        'free-tour-santiago-imprescindible',
        'tour-mut-santiago-urbano',
        'tour-dictadura-chile-1973',
        'tour-barrio-yungay-arte-urbano',
    ]

    const tourEntries = tours.map((slug) => ({
        url: `${baseUrl}/tours/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        ...tourEntries,
    ]
}

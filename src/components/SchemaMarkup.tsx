
import Script from 'next/script';

export default function SchemaMarkup({ schema }: { schema: any }) {
    return (
        <Script
            id="schema-markup"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'src', 'data', 'tours-status.json');
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            return NextResponse.json(JSON.parse(fileContent));
        }
        return NextResponse.json({});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read status' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { slug, status } = body;

        if (!slug) {
            return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
        }

        // status can be "si"/"no" (string) or true/false (boolean)
        const isActive = typeof status === 'string'
            ? status.toLowerCase() === 'si'
            : !!status;

        const filePath = path.join(process.cwd(), 'src', 'data', 'tours-status.json');

        // Read current status
        let toursStatus = {};
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            toursStatus = JSON.parse(fileContent);
        }

        // Update status
        toursStatus = {
            ...toursStatus,
            [slug]: isActive
        };

        // Write back to file
        fs.writeFileSync(filePath, JSON.stringify(toursStatus, null, 2));

        console.log(`Tour ${slug} updated to ${isActive ? 'active' : 'inactive'}`);

        return NextResponse.json({
            success: true,
            message: `Tour ${slug} updated`,
            currentStatus: isActive
        });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

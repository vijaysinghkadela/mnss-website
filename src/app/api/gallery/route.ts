import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { MediaItem } from '@/types';

const publicDir = path.join(process.cwd(), 'public');
const uploadsImagesDir = path.join(publicDir, 'uploads', 'images');
const progressImagesDir = path.join(publicDir, 'images', 'progress');
const videosDir = path.join(publicDir, 'uploads', 'videos');

export async function GET() {
	// Ensure directories exist; if not, create them so listing works without errors
	try {
		await fs.mkdir(uploadsImagesDir, { recursive: true });
		await fs.mkdir(videosDir, { recursive: true });
	} catch (e) {
		// If mkdir fails (permissions, etc.), continue; listing will return empty arrays below
		console.error('gallery: mkdir failed', e);
	}
		async function list(dir: string, type: 'image' | 'video', baseUrl: string): Promise<MediaItem[]> {
		try {
			const entries = await fs.readdir(dir, { withFileTypes: true });
			const files = entries.filter((e) => e.isFile());
			const mapped = await Promise.all(
				files.map(async (e) => {
					const filename = e.name;
					const filePath = path.join(dir, filename);
					let mtime: Date;
					try {
						const stat = await fs.stat(filePath);
						mtime = stat.mtime;
					} catch {
						mtime = new Date();
					}
					const url = `${baseUrl}/${filename}`;
					const item: MediaItem = {
						id: `${type}-${baseUrl}-${filename}`,
						type,
						url,
						title: filename,
						description: '',
						createdAt: mtime.toISOString(),
						filename,
					};
					return item;
				})
			);
			return mapped;
			} catch {
				return [] as MediaItem[];
		}
	}

	try {
		const [uploadImages, progressImages, videos] = await Promise.all([
			list(uploadsImagesDir, 'image', '/uploads/images'),
			list(progressImagesDir, 'image', '/images/progress'),
			list(videosDir, 'video', '/uploads/videos'),
		]);

		const items = [...progressImages, ...uploadImages, ...videos].sort(
			(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);
		return NextResponse.json({ items });
	} catch (e) {
		console.error('gallery: listing failed', e);
		return NextResponse.json({ items: [], error: 'Failed to list media' }, { status: 200 });
	}
}

INSERT INTO Movies (
	title,
    description,
    year,
    duration,
    filename,
    thumbnailPortrait,
    thumbnailVertical,
    dateAdded
)
VALUES (
	'The Shawshank Redemption',
    'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.',
    1994,
    144,
    'shawshank.mkv',
    'shawshankPortrait.jpg',
    'shawshankVertical.jpg',
    now()
);

SELECT * FROM movies ORDER BY  dateAdded ASC LIMIT 50;
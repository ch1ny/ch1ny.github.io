const preZero = (str, minLength = 0) =>
	str.length <= 2 ? str : `${new Array(minLength).fill('0').join('')}${str}`.slice(minLength);

const FILE_TEMPLATE = `---
title: {{title}}
date: {{date}}
tags: []
categories: []
cover: 
---
`;

/**
 * 随机文件名长度
 */
const RANDOM_FILE_NAME_LENGTH = 6;
const createRandomHexo = async () => {
	const now = new Date();
	const dateStr = `${now.getFullYear()}-${preZero(
		(now.getMonth() + 1).toString(),
		2
	)}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

	const fileStr = FILE_TEMPLATE.replace('{{date}}', dateStr);
};

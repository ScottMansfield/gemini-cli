/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Logger, decodeTagName } from './logger.js';
import { Config } from '../config/config.js';

export async function saveChat(
  logger: Logger,
  config: Config | null,
  tag: string,
): Promise<{ success: boolean; message: string }> {
  const chat = await config?.getGeminiClient()?.getChat();
  if (!chat) {
    return {
      success: false,
      message: 'No chat client available to save conversation.',
    };
  }

  const history = await chat.getHistory();
  if (history.length > 2) {
    await logger.saveCheckpoint(history, tag);
    return {
      success: true,
      message: `Conversation checkpoint saved with tag: ${decodeTagName(tag)}.`,
    };
  } else {
    return { success: true, message: 'No conversation found to save.' };
  }
}

/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Config, Logger, Storage, saveChat } from '@google/gemini-cli-core';

const TAG = 'savedBySignal';

export async function saveChatOnSignal(config: Config | null) {
  if (!config) {
    return;
  }

  // Same initialization as the slash command processor
  const logger = new Logger(
    config?.getSessionId() || '',
    config?.storage ?? new Storage(process.cwd()),
  );
  await logger.initialize();

  // Always overwrite the savedBySignal tag when a signal is received
  await saveChat(logger, config, TAG);
}

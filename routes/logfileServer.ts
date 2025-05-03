/*
 * Copyright (c) 2014-2025 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path from 'node:path'
import { type Request, type Response, type NextFunction } from 'express'

export function serveLogFiles () {
  return ({ params }: Request, res: Response, next: NextFunction) => {
    const file = params.file
    const logDir = path.resolve('logs')
    const safe = path.basename(file).replace(/[^a-zA-Z0-9_.-]/g, '')
    const abs = path.join(logDir, safe)
    if (!abs.startsWith(logDir)) {
      return res.status(400).send('Invalid file name')
    }
    res.sendFile(abs)
  }
}

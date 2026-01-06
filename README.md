# @ts-core/two-fa

Общая TypeScript библиотека интерфейсов и типов для систем двухфакторной аутентификации (2FA). Предоставляет базовые абстракции для реализации функциональности 2FA.

## Содержание

- [Установка](#установка)
- [Зависимости](#зависимости)
- [Основные интерфейсы](#основные-интерфейсы)
- [DTO (Data Transfer Objects)](#dto-data-transfer-objects)
- [Примеры использования](#примеры-использования)
- [Поддерживаемые типы 2FA](#поддерживаемые-типы-2fa)
- [Связанные пакеты](#связанные-пакеты)

## Установка

```bash
npm install @ts-core/two-fa
```

```bash
yarn add @ts-core/two-fa
```

```bash
pnpm add @ts-core/two-fa
```

## Зависимости

| Пакет | Описание |
|-------|----------|
| `@ts-core/common` | Базовые классы и интерфейсы |

## Основные интерфейсы

### ITwoFa

Базовый интерфейс для конфигурации двухфакторной аутентификации:

```typescript
interface ITwoFa {
    id: number;           // Уникальный идентификатор записи 2FA
    type: string;         // Тип 2FA (totp, sms, email и др.)
    ownerUid: TwoFaOwnerUid; // Идентификатор владельца (пользователя)
    readonly isEnabled: boolean; // Флаг активности 2FA
}
```

### TwoFaOwnerUid

Тип для идентификации владельца 2FA:

```typescript
type TwoFaOwnerUid = number | string;
```

Позволяет использовать как числовые, так и строковые идентификаторы пользователей.

## DTO (Data Transfer Objects)

Библиотека предоставляет набор DTO для различных операций с 2FA:

### ITwoFaDto

Базовый DTO для операций валидации токена:

```typescript
interface ITwoFaDto extends ITraceable {
    type: string;   // Тип 2FA
    token: string;  // Одноразовый токен для проверки
}
```

### ITwoFaCreateDto / ITwoFaCreateDtoResponse

DTO для создания новой записи 2FA:

```typescript
// Запрос
interface ITwoFaCreateDto extends ITraceable {
    type: string;           // Тип создаваемой 2FA
    ownerUid: TwoFaOwnerUid; // Идентификатор владельца
}

// Ответ
interface ITwoFaCreateDtoResponse<T = any> {
    type: string;    // Тип созданной 2FA
    details: T;      // Детали (например, QR-код для TOTP)
}
```

### ITwoFaSaveDto

DTO для сохранения (активации) 2FA после верификации:

```typescript
interface ITwoFaSaveDto extends ITwoFaDto {
    ownerUid: TwoFaOwnerUid; // Идентификатор владельца
    type: string;            // Тип 2FA
    token: string;           // Токен для подтверждения
}
```

### ITwoFaListDto / ITwoFaListDtoResponse

DTO для получения списка 2FA с пагинацией:

```typescript
// Запрос
interface ITwoFaListDto extends IPaginable<ITwoFa>, ITraceable {}

// Ответ
interface ITwoFaListDtoResponse extends IPagination<ITwoFa> {}
```

### ITwoFaResetStartDto / ITwoFaResetFinishDto

DTO для процесса сброса 2FA:

```typescript
// Начало сброса
interface ITwoFaResetStartDto extends ITraceable {
    ownerUid: TwoFaOwnerUid; // Идентификатор владельца
    type: string;            // Тип 2FA для сброса
}
// Ответ: string (resetUid — идентификатор сброса)

// Завершение сброса
interface ITwoFaResetFinishDto extends ITraceable {
    resetUid: string;  // Идентификатор сброса из предыдущего шага
}
// Ответ: ITwoFa
```

## Примеры использования

### Проверка статуса 2FA

```typescript
import { ITwoFa, TwoFaOwnerUid } from '@ts-core/two-fa';

// Проверка, включена ли 2FA
function is2FAEnabled(twoFa: ITwoFa | null): boolean {
    return twoFa !== null && twoFa.isEnabled;
}

// Получение статуса всех типов 2FA для пользователя
function get2FAStatus(userId: TwoFaOwnerUid, twoFaList: ITwoFa[]): Map<string, boolean> {
    const status = new Map<string, boolean>();

    for (const twoFa of twoFaList) {
        if (twoFa.ownerUid === userId) {
            status.set(twoFa.type, twoFa.isEnabled);
        }
    }

    return status;
}
```

### Создание 2FA

```typescript
import { ITwoFaCreateDto, ITwoFaCreateDtoResponse } from '@ts-core/two-fa';

// Подготовка запроса на создание TOTP
const createDto: ITwoFaCreateDto = {
    type: 'totp',
    ownerUid: 'user-123'
};

// Ответ будет содержать детали для настройки (QR-код и т.д.)
// const response: ITwoFaCreateDtoResponse<{ qrCode: string, secret: string }>
```

### Валидация токена

```typescript
import { ITwoFaDto } from '@ts-core/two-fa';

// Проверка введённого пользователем кода
const validateDto: ITwoFaDto = {
    type: 'totp',
    token: '123456'
};
```

### Сброс 2FA

```typescript
import { ITwoFaResetStartDto, ITwoFaResetFinishDto } from '@ts-core/two-fa';

// Шаг 1: Начало сброса
const resetStartDto: ITwoFaResetStartDto = {
    ownerUid: 'user-123',
    type: 'totp'
};
// Сервер вернёт resetUid

// Шаг 2: Завершение сброса (после подтверждения через email/admin)
const resetFinishDto: ITwoFaResetFinishDto = {
    resetUid: 'reset-abc-123'
};
```

## Поддерживаемые типы 2FA

Библиотека поддерживает различные типы двухфакторной аутентификации:

| Тип | Описание | Реализация |
|-----|----------|------------|
| `totp` | Time-based One-Time Password (Google Authenticator, Authy) | `@ts-core/two-fa-totp` |
| `sms` | SMS-код на телефон | Требует интеграции с SMS-провайдером |
| `email` | Код на email | Требует интеграции с email-сервисом |
| `backup` | Резервные коды | Можно реализовать через `@ts-core/two-fa-backend` |

## Архитектура

```
@ts-core/two-fa (этот пакет)
    │
    ├── Интерфейсы и типы
    │   ├── ITwoFa — базовый интерфейс 2FA
    │   └── TwoFaOwnerUid — тип идентификатора владельца
    │
    └── DTO для API
        ├── ITwoFaCreateDto — создание 2FA
        ├── ITwoFaDto — валидация токена
        ├── ITwoFaSaveDto — сохранение/активация
        ├── ITwoFaListDto — получение списка
        └── ITwoFaResetStartDto/FinishDto — сброс 2FA

@ts-core/two-fa-backend
    │
    └── Серверная реализация
        ├── Entity для БД
        ├── Сервисы
        └── Контроллеры

@ts-core/two-fa-totp
    │
    └── TOTP провайдер
        └── Реализация алгоритма RFC 6238
```

## Связанные пакеты

| Пакет | Описание |
|-------|----------|
| `@ts-core/two-fa-backend` | Серверная реализация с сущностями БД и сервисами |
| `@ts-core/two-fa-totp` | TOTP провайдер (Google Authenticator, Authy) |

## Автор

**Renat Gubaev** — [renat.gubaev@gmail.com](mailto:renat.gubaev@gmail.com)

- GitHub: [ManhattanDoctor](https://github.com/ManhattanDoctor)
- Репозиторий: [ts-core-two-fa](https://github.com/ManhattanDoctor/ts-core-two-fa)

## Лицензия

ISC

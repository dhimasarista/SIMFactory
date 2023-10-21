package models

import "database/sql"

type Material struct {
	ID           sql.NullInt64  `json:"id"`
	Name         sql.NullString `json:"name"`
	Manufacturer sql.NullString `json:"manufacturer"`
	Stocks       sql.NullInt64  `json:"stocks"`
	UpdatedBy    sql.NullString `json:"updatedBy"`
}
